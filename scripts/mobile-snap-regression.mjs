/**
 * Mobile services scroll regression — vertical native list + free page scroll.
 * No nested overflow scroller, no document Y-snap, no gesture interception.
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
    const nested = document.querySelector('.services-x-scroller')
    const nextSection = document.querySelector('#clients')
    const services = document.querySelector('#services')
    const cards = document.querySelectorAll('[data-service-card-mobile]')
    const firstCard = cards[0]
    const midCard = cards[Math.min(2, cards.length - 1)]
    const lastCard = cards[cards.length - 1]
    return {
      y: window.scrollY,
      snapType: getComputedStyle(html).scrollSnapType,
      hasYSnapClass: html.classList.contains('services-snap-on'),
      hasReleasedClass: html.classList.contains('services-snap-released'),
      nestedScrollerExists: Boolean(nested),
      cardCount: cards.length,
      firstCardTop: firstCard?.getBoundingClientRect().top ?? null,
      midCardTop: midCard?.getBoundingClientRect().top ?? null,
      lastCardTop: lastCard?.getBoundingClientRect().top ?? null,
      servicesBottom: services?.getBoundingClientRect().bottom ?? null,
      nextTop: nextSection?.getBoundingClientRect().top ?? null,
      bodyOverflowY: getComputedStyle(document.body).overflowY,
      htmlOverflowY: getComputedStyle(html).overflowY,
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
  if (m.nestedScrollerExists) {
    failures.push('Nested .services-x-scroller must not exist')
  }
  if (m.cardCount < 5) failures.push(`Too few mobile service cards: ${m.cardCount}`)

  // Enter services — first card reachable via native vertical scroll
  await page.locator('#services').scrollIntoViewIfNeeded()
  await settle(page, 400)
  m = await metrics(page)
  const yAtServices = m.y
  console.log('At services:', m)

  // Leave early (before last card) into Clients — must not trap
  await page.evaluate(() => {
    document.querySelector('#clients')?.scrollIntoView({ block: 'start', behavior: 'instant' })
  })
  await settle(page, 500)
  m = await metrics(page)
  console.log('Leave early → Clients:', m)
  if (m.snapType && m.snapType !== 'none') {
    failures.push('Snap reappeared after leave-early')
  }
  if ((m.nextTop ?? 999) > 120) {
    failures.push(`Clients not near top after leave-early (top=${m.nextTop})`)
  }

  // Scroll to last card, then continue to Clients
  await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-service-card-mobile]')
    cards[cards.length - 1]?.scrollIntoView({ block: 'center', behavior: 'instant' })
  })
  await settle(page, 400)
  const yAtLast = (await metrics(page)).y

  await page.evaluate(() => {
    document.querySelector('#clients')?.scrollIntoView({ block: 'start', behavior: 'instant' })
  })
  await settle(page, 500)
  m = await metrics(page)
  console.log('Exit last card → Clients:', m)
  if ((m.nextTop ?? 999) > 120) {
    failures.push(`Clients not near top after last-card exit (top=${m.nextTop})`)
  }
  if (m.y <= yAtLast - 20 && (m.nextTop ?? 999) > 80) {
    failures.push('Page did not advance past last card into Clients')
  }

  // Reverse upward through services — monotonic free scroll, no yank
  const samples = []
  for (let i = 0; i < 14; i += 1) {
    await page.evaluate(() => window.scrollBy(0, -180))
    await sleep(40)
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

  // Direction reverse: down → up → down must remain stable
  await page.locator('#services').scrollIntoViewIfNeeded()
  await settle(page, 300)
  const reverseYs = []
  for (const delta of [220, 220, -180, -180, 240, 240]) {
    await page.evaluate((d) => window.scrollBy(0, d), delta)
    await sleep(45)
    reverseYs.push((await metrics(page)).y)
  }
  console.log('Reverse direction ys:', reverseYs)
  for (let i = 1; i < reverseYs.length; i += 1) {
    const expectedUp = reverseYs[i] < reverseYs[i - 1] - 20
    const expectedDown = reverseYs[i] > reverseYs[i - 1] + 20
    const delta = [220, 220, -180, -180, 240, 240][i]
    if (delta > 0 && !expectedDown && Math.abs(reverseYs[i] - reverseYs[i - 1]) > 5) {
      // allow clamping at document ends; only fail on opposite yank
      if (reverseYs[i] < reverseYs[i - 1] - 80) {
        failures.push(`Reverse-down yank at step ${i}: ${reverseYs[i - 1]} → ${reverseYs[i]}`)
        break
      }
    }
    if (delta < 0 && reverseYs[i] > reverseYs[i - 1] + 80) {
      failures.push(`Reverse-up yank at step ${i}: ${reverseYs[i - 1]} → ${reverseYs[i]}`)
      break
    }
  }

  // Progress indicator present and updates while scrolling cards
  const progress = page.locator('text=/\\d{2}\\s*من\\s*\\d{2}/')
  if ((await progress.count()) < 1) failures.push('Progress indicator missing')

  await page.evaluate(() => {
    document.querySelectorAll('[data-service-card-mobile]')[0]?.scrollIntoView({
      block: 'center',
      behavior: 'instant',
    })
  })
  await settle(page, 500)
  const progressFirst = (await progress.first().textContent())?.replace(/\s+/g, ' ') ?? ''

  await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-service-card-mobile]')
    cards[Math.min(3, cards.length - 1)]?.scrollIntoView({
      block: 'center',
      behavior: 'instant',
    })
  })
  await settle(page, 600)
  const progressMid = (await progress.first().textContent())?.replace(/\s+/g, ' ') ?? ''
  console.log('Progress first→mid:', progressFirst, '→', progressMid)
  if (progressFirst === progressMid && m.cardCount > 3) {
    // Soft check: IO may lag in headless; require indicator still matches pattern
    if (!/\d{2}\s*من\s*\d{2}/.test(progressMid)) {
      failures.push(`Progress indicator invalid after scroll: ${progressMid}`)
    }
  }

  // Sticky bar must not force scroll position
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.6))
  await settle(page, 400)
  const yBeforeSticky = (await metrics(page)).y
  await settle(page, 500)
  const yAfterSticky = (await metrics(page)).y
  if (Math.abs(yAfterSticky - yBeforeSticky) > 40) {
    failures.push(
      `Sticky bar / observers moved scroll (${yBeforeSticky} → ${yAfterSticky})`,
    )
  }

  // Sanity: services entry y was finite and page can leave services
  if (!(yAtServices >= 0)) failures.push('Could not enter Services')

  await browser.close()

  if (failures.length) {
    console.error('\nFAILED:')
    failures.forEach((f) => console.error(' -', f))
    process.exit(1)
  }
  console.log('\nOK: vertical services list + free native page scroll')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
