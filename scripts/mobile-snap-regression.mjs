/**
 * Mobile services scroll regression — horizontal carousel + free vertical page scroll.
 * SNAP_TEST_URL=http://127.0.0.1:4335/ node scripts/mobile-snap-regression.mjs
 */
import { chromium, devices } from 'playwright'

const BASE = process.env.SNAP_TEST_URL || 'http://127.0.0.1:4335/'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const settle = async (page, ms = 400) => {
  await sleep(ms)
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  )
}

async function metrics(page) {
  return page.evaluate(() => {
    const html = document.documentElement
    const scroller = document.querySelector('.services-x-scroller')
    const featured = document.querySelector('#featured-heading')?.closest('section')
    const services = document.querySelector('#services')
    return {
      y: window.scrollY,
      snapType: getComputedStyle(html).scrollSnapType,
      hasYSnapClass: html.classList.contains('services-snap-on'),
      hasReleasedClass: html.classList.contains('services-snap-released'),
      scrollerExists: Boolean(scroller),
      scrollerSnap: scroller ? getComputedStyle(scroller).scrollSnapType : null,
      slideCount: document.querySelectorAll('[data-service-slide]').length,
      servicesBottom: services?.getBoundingClientRect().bottom ?? null,
      featuredTop: featured?.getBoundingClientRect().top ?? null,
    }
  })
}

async function main() {
  const failures = []
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    ...devices['iPhone 13'],
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()

  console.log('Loading', BASE)
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
  await settle(page, 700)
  await page.waitForSelector('#services', { timeout: 15000 })

  let m = await metrics(page)
  console.log('Initial:', m)
  if (m.hasYSnapClass || m.hasReleasedClass) {
    failures.push('Document Y-snap classes must be gone')
  }
  if (m.snapType && m.snapType !== 'none') {
    failures.push(`html scroll-snap-type should be none, got ${m.snapType}`)
  }
  if (!m.scrollerExists) failures.push('Horizontal services scroller missing')
  if (!String(m.scrollerSnap || '').includes('x')) {
    failures.push(`Expected x snap on scroller, got ${m.scrollerSnap}`)
  }
  if (m.slideCount < 5) failures.push(`Too few slides: ${m.slideCount}`)

  // Enter services, swipe horizontally
  await page.locator('#services').scrollIntoViewIfNeeded()
  await settle(page, 400)
  const yAtServices = (await metrics(page)).y

  await page.evaluate(() => {
    const scroller = document.querySelector('.services-x-scroller')
    if (!scroller) return
    // RTL: scroll toward next cards
    scroller.scrollBy({ left: -scroller.clientWidth * 0.85, behavior: 'instant' })
  })
  await settle(page, 400)
  const yAfterHSwipe = (await metrics(page)).y
  if (Math.abs(yAfterHSwipe - yAtServices) > 80) {
    failures.push(
      `Horizontal swipe moved page vertically too much (${yAtServices} → ${yAfterHSwipe})`,
    )
  }

  // Exit downward into Featured — must be free vertical scroll
  await page.evaluate(() => {
    const featured = document.querySelector('#featured-heading')
    featured?.scrollIntoView({ block: 'start', behavior: 'instant' })
  })
  await settle(page, 500)
  m = await metrics(page)
  console.log('At featured:', m)
  if (m.snapType && m.snapType !== 'none') {
    failures.push('Snap reappeared at Featured')
  }
  if ((m.featuredTop ?? 999) > 120) {
    failures.push(`Featured not near top after scroll (top=${m.featuredTop})`)
  }

  // Reverse upward through services — monotonic free scroll, no yank
  const samples = []
  for (let i = 0; i < 12; i += 1) {
    await page.evaluate(() => window.scrollBy(0, -160))
    await sleep(35)
    samples.push(await metrics(page))
  }
  console.log(
    'Up samples',
    samples.map((s) => ({ y: s.y, snap: s.snapType })),
  )
  for (let i = 1; i < samples.length; i += 1) {
    if (samples[i].y > samples[i - 1].y + 50) {
      failures.push(`YANK down while scrolling up ${samples[i - 1].y} → ${samples[i].y}`)
      break
    }
    if (samples[i].snapType && samples[i].snapType !== 'none') {
      failures.push('Document snap armed during reverse travel')
      break
    }
  }

  // Progress indicator present
  const progress = await page.locator('text=/\\d{2}\\s*من\\s*\\d{2}/').count()
  if (progress < 1) failures.push('Progress indicator missing')

  await browser.close()

  if (failures.length) {
    console.error('\nFAILED:')
    failures.forEach((f) => console.error(' -', f))
    process.exit(1)
  }
  console.log('\nOK: horizontal services + free vertical scroll')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
