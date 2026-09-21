/**
 * Mobile services snap regression checks (Playwright).
 * Run: npx playwright test scripts/mobile-snap-regression.mjs
 * Or: node --experimental-vm-modules via playwright directly below.
 */
import { chromium, devices } from 'playwright'

const BASE = process.env.SNAP_TEST_URL || 'http://127.0.0.1:4335/'
const iphone = devices['iPhone 13']

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function settle(page, ms = 450) {
  await sleep(ms)
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}

async function metrics(page) {
  return page.evaluate(() => {
    const intro = document.querySelector('.services-intro-panel')
    const featured = document.querySelector('#featured, [data-featured], section')
    const featuredEl =
      document.querySelector('#services')?.nextElementSibling ||
      Array.from(document.querySelectorAll('section')).find((s) =>
        s.textContent?.includes('خدمة'),
      )
    const last = document.querySelector('.services-page-panel--last')
    const hero = document.querySelector('#home, .hero-section')
    return {
      y: window.scrollY,
      vh: window.innerHeight,
      snapOn: document.documentElement.classList.contains('services-snap-on'),
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
    }
  })
}

async function wheelUp(page, steps = 8, delta = -120) {
  for (let i = 0; i < steps; i += 1) {
    await page.mouse.wheel(0, delta)
    await sleep(40)
  }
}

async function wheelDown(page, steps = 8, delta = 140) {
  for (let i = 0; i < steps; i += 1) {
    await page.mouse.wheel(0, delta)
    await sleep(40)
  }
}

async function touchSwipeUp(page, distance = 280) {
  const box = await page.viewportSize()
  const x = Math.floor((box?.width || 390) / 2)
  const startY = Math.floor((box?.height || 844) * 0.7)
  await page.touchscreen.tap(x, startY)
  // Playwright doesn't have drag for touch easily — use evaluate touch events
  await page.evaluate(
    ({ x, startY, distance }) => {
      const target = document.scrollingElement || document.documentElement
      const fire = (type, y, id = 1) => {
        const t = new Touch({
          identifier: id,
          target,
          clientX: x,
          clientY: y,
          pageX: x,
          pageY: y,
        })
        const ev = new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          touches: type === 'touchend' ? [] : [t],
          targetTouches: type === 'touchend' ? [] : [t],
          changedTouches: [t],
        })
        target.dispatchEvent(ev)
      }
      fire('touchstart', startY)
      const frames = 12
      for (let i = 1; i <= frames; i += 1) {
        fire('touchmove', startY - (distance * i) / frames)
      }
      fire('touchend', startY - distance)
      window.scrollBy(0, distance)
    },
    { x, startY, distance },
  )
}

async function touchSwipeDown(page, distance = 280) {
  const box = await page.viewportSize()
  const x = Math.floor((box?.width || 390) / 2)
  const startY = Math.floor((box?.height || 844) * 0.35)
  await page.evaluate(
    ({ x, startY, distance }) => {
      const target = document.scrollingElement || document.documentElement
      const fire = (type, y, id = 1) => {
        const t = new Touch({
          identifier: id,
          target,
          clientX: x,
          clientY: y,
          pageX: x,
          pageY: y,
        })
        const ev = new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          touches: type === 'touchend' ? [] : [t],
          targetTouches: type === 'touchend' ? [] : [t],
          changedTouches: [t],
        })
        target.dispatchEvent(ev)
      }
      fire('touchstart', startY)
      const frames = 12
      for (let i = 1; i <= frames; i += 1) {
        fire('touchmove', startY + (distance * i) / frames)
      }
      fire('touchend', startY + distance)
      window.scrollBy(0, -distance)
    },
    { x, startY, distance },
  )
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

  // Ensure services intro exists
  await page.waitForSelector('.services-intro-panel', { timeout: 15000 })

  // --- Test 1: reach intro, then scroll back to hero ---
  await page.evaluate(() => {
    const intro = document.querySelector('.services-intro-panel')
    intro?.scrollIntoView({ block: 'start' })
  })
  await settle(page, 600)
  // Simulate downward intent then upward (as if arrived from hero)
  await page.evaluate(() => {
    window.dispatchEvent(new WheelEvent('wheel', { deltaY: 80, bubbles: true }))
  })
  await settle(page, 200)
  let m = await metrics(page)
  console.log('At intro:', m)

  // Fire upward wheel intent then scroll up
  for (let i = 0; i < 10; i += 1) {
    await page.evaluate(() => {
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: -140, bubbles: true }))
    })
    await page.evaluate(() => window.scrollBy(0, -140))
    await sleep(50)
  }
  await settle(page, 700)
  m = await metrics(page)
  console.log('After up from intro:', m)
  if (m.introFill > 0.85 && m.y > 100) {
    failures.push(
      `TRAP: still stuck on intro after scrolling up (y=${m.y}, introFill=${m.introFill.toFixed(2)}, snapOn=${m.snapOn})`,
    )
  }
  if (m.snapOn) {
    failures.push(`Snap still on after upward exit from intro`)
  }

  // --- Test 2: go past last service to featured-ish, then scroll up — y should not jump down ---
  await page.evaluate(() => {
    const last = document.querySelector('.services-page-panel--last')
    last?.scrollIntoView({ block: 'start' })
  })
  await settle(page, 500)
  // Move past last
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.85))
  await settle(page, 500)
  // Ensure latch: dispatch down then measure
  await page.evaluate(() => {
    window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true }))
  })
  await settle(page, 300)
  m = await metrics(page)
  console.log('Past last / featured zone:', m)
  if (m.snapOn) {
    failures.push(`Snap still on after passing last service`)
  }

  const yBeforeUp = m.y
  const samples = []
  for (let i = 0; i < 14; i += 1) {
    await page.evaluate(() => {
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: -160, bubbles: true }))
    })
    await page.evaluate(() => window.scrollBy(0, -160))
    await sleep(45)
    const cur = await metrics(page)
    samples.push({ y: cur.y, snapOn: cur.snapOn })
  }
  await settle(page, 500)
  m = await metrics(page)
  console.log('After up from featured:', m)
  console.log('Upward samples:', samples)

  // Detect downward yank: any sample where y increased significantly while intending up
  let yank = false
  for (let i = 1; i < samples.length; i += 1) {
    if (samples[i].y > samples[i - 1].y + 80) {
      yank = true
      failures.push(
        `YANK: scroll jumped down while going up (${samples[i - 1].y} → ${samples[i].y}) snap=${samples[i].snapOn}`,
      )
      break
    }
  }
  if (m.y >= yBeforeUp - 40) {
    failures.push(
      `Did not make upward progress from featured zone (before=${yBeforeUp}, after=${m.y})`,
    )
  }
  if (samples.some((s) => s.snapOn)) {
    failures.push(`Snap re-armed during upward travel from featured`)
  }

  // --- Test 3: touch swipe up from intro ---
  await page.evaluate(() => {
    document.querySelector('.services-intro-panel')?.scrollIntoView({ block: 'start' })
  })
  await settle(page, 400)
  await page.evaluate(() => {
    window.dispatchEvent(new WheelEvent('wheel', { deltaY: 50, bubbles: true }))
  })
  // Finger moves down on screen = scroll up
  await page.evaluate(() => {
    const target = document.documentElement
    const mk = (y) =>
      new Touch({
        identifier: 1,
        target,
        clientX: 180,
        clientY: y,
        pageX: 180,
        pageY: y,
      })
    let t = mk(400)
    target.dispatchEvent(
      new TouchEvent('touchstart', {
        bubbles: true,
        touches: [t],
        targetTouches: [t],
        changedTouches: [t],
      }),
    )
    for (const y of [420, 460, 520, 580, 640]) {
      t = mk(y)
      target.dispatchEvent(
        new TouchEvent('touchmove', {
          bubbles: true,
          touches: [t],
          targetTouches: [t],
          changedTouches: [t],
        }),
      )
    }
    target.dispatchEvent(
      new TouchEvent('touchend', {
        bubbles: true,
        touches: [],
        targetTouches: [],
        changedTouches: [t],
      }),
    )
    window.scrollBy(0, -320)
  })
  await settle(page, 500)
  m = await metrics(page)
  console.log('After touch up from intro:', m)
  if (m.snapOn) {
    failures.push(`Snap still on after touch upward from intro`)
  }

  await browser.close()

  if (failures.length) {
    console.error('\nFAILED:')
    for (const f of failures) console.error(' -', f)
    process.exit(1)
  }
  console.log('\nOK: mobile snap regressions passed')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
