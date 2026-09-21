/**
 * Mobile services snap regression checks (Playwright).
 * SNAP_TEST_URL=http://127.0.0.1:4335/ node scripts/mobile-snap-regression.mjs
 */
import { chromium, devices } from 'playwright'

const BASE = process.env.SNAP_TEST_URL || 'http://127.0.0.1:4335/'
const iphone = devices['iPhone 13']

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const settle = async (page, ms = 450) => {
  await sleep(ms)
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  )
}

async function metrics(page) {
  return page.evaluate(() => {
    const intro = document.querySelector('.services-intro-panel')
    const last = document.querySelector('.services-page-panel--last')
    const hero = document.querySelector('#home, .hero-section')
    const featuredEl = document.querySelector('#services')?.nextElementSibling
    return {
      y: window.scrollY,
      vh: window.innerHeight,
      snapOn: document.documentElement.classList.contains('services-snap-on'),
      released: document.documentElement.classList.contains('services-snap-released'),
      introTop: intro ? intro.getBoundingClientRect().top : null,
      introFill: intro
        ? Math.max(
            0,
            Math.min(intro.getBoundingClientRect().bottom, window.innerHeight) -
              Math.max(intro.getBoundingClientRect().top, 0),
          ) / window.innerHeight
        : 0,
      heroTop: hero ? hero.getBoundingClientRect().top : null,
      lastBottom: last ? last.getBoundingClientRect().bottom : null,
      featuredTop: featuredEl ? featuredEl.getBoundingClientRect().top : null,
      snapType: getComputedStyle(document.documentElement).scrollSnapType,
    }
  })
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    ...iphone,
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()
  const failures = []

  console.log('Loading', BASE)
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
  await settle(page, 800)
  await page.waitForSelector('.services-intro-panel', { timeout: 15000 })

  // --- Intro: can leave upward ---
  await page.evaluate(() => {
    document.querySelector('.services-intro-panel')?.scrollIntoView({ block: 'start' })
  })
  await settle(page, 500)
  // Arm snap as if finger lifted in corridor
  await page.evaluate(() => {
    window.dispatchEvent(new Event('touchend', { bubbles: true }))
  })
  await settle(page, 300)
  let m = await metrics(page)
  console.log('At intro:', m)

  for (let i = 0; i < 10; i += 1) {
    await page.evaluate(() => window.scrollBy(0, -140))
    await sleep(40)
  }
  await settle(page, 600)
  m = await metrics(page)
  console.log('After up from intro:', m)
  if (m.introFill > 0.85 && m.y > 80) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await settle(page, 400)
    m = await metrics(page)
    console.log('After scrollTo(0) from intro:', m)
    if (m.y > 80) {
      failures.push(`TRAP on intro after up (y=${m.y}, fill=${m.introFill.toFixed(2)})`)
    }
  }

  // --- On/past last: released hard-off ---
  await page.evaluate(() => {
    document.querySelector('.services-page-panel--last')?.scrollIntoView({ block: 'start' })
  })
  await settle(page, 400)
  await page.evaluate(() => window.dispatchEvent(new Event('touchend', { bubbles: true })))
  await settle(page, 350)
  m = await metrics(page)
  console.log('On last:', m)
  if (m.snapOn) failures.push('snapOn still true on last card')
  if (!m.released) failures.push('services-snap-released missing on last card')
  if (m.snapType && m.snapType !== 'none') {
    failures.push(`computed snapType still ${m.snapType} on last`)
  }

  // Move into Featured freely
  await page.evaluate(() => window.scrollBy(0, Math.round(window.innerHeight * 0.7)))
  await settle(page, 400)
  m = await metrics(page)
  console.log('Into featured:', m)
  if (m.snapOn || !m.released) {
    failures.push('snap not released after moving into Featured')
  }

  // --- Reverse from featured: monotonic up, snap stays released ---
  const yBefore = m.y
  const samples = []
  for (let i = 0; i < 16; i += 1) {
    await page.evaluate(() => window.scrollBy(0, -180))
    await sleep(35)
    samples.push(await metrics(page))
  }
  await settle(page, 400)
  m = await metrics(page)
  console.log('After reverse up:', m)
  console.log(
    'samples',
    samples.map((s) => ({ y: s.y, snapOn: s.snapOn, released: s.released })),
  )

  for (let i = 1; i < samples.length; i += 1) {
    if (samples[i].y > samples[i - 1].y + 60) {
      failures.push(`YANK down ${samples[i - 1].y} → ${samples[i].y}`)
      break
    }
  }
  if (samples.some((s) => s.snapOn)) {
    failures.push('snap re-armed during reverse travel')
  }
  if (samples.some((s) => !s.released)) {
    failures.push('released latch dropped during reverse travel')
  }
  if (m.y >= yBefore - 80) {
    failures.push(`no upward progress (before=${yBefore}, after=${m.y})`)
  }

  // Long reverse through corridor to hero zone
  for (let i = 0; i < 40; i += 1) {
    await page.evaluate(() => window.scrollBy(0, -220))
    await sleep(20)
  }
  await settle(page, 500)
  m = await metrics(page)
  console.log('Near top after long reverse:', m)
  if (m.y > 2000) {
    failures.push(`long reverse stalled at y=${m.y}`)
  }

  await browser.close()
  if (failures.length) {
    console.error('\nFAILED:')
    failures.forEach((f) => console.error(' -', f))
    process.exit(1)
  }
  console.log('\nOK: mobile snap regressions passed')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
