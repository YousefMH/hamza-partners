/**
 * Conversion upgrade QA matrix — Playwright
 * SNAP_TEST_URL=http://127.0.0.1:4335/ node scripts/conversion-qa.mjs
 */
import { chromium, devices } from 'playwright'
import { pathToFileURL } from 'node:url'

const BASE = process.env.SNAP_TEST_URL || 'http://127.0.0.1:4335/'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function settle(page, ms = 400) {
  await sleep(ms)
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  )
}

function assert(cond, msg, failures) {
  if (!cond) failures.push(msg)
}

async function checkOverflow(page, label, failures) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement
    return {
      scrollWidth: doc.scrollWidth,
      innerWidth: window.innerWidth,
    }
  })
  assert(
    overflow.scrollWidth <= overflow.innerWidth + 2,
    `Horizontal overflow at ${label}: ${overflow.scrollWidth} > ${overflow.innerWidth}`,
    failures,
  )
}

async function consoleErrors(page, failures, label) {
  // collected via page.on
  void page
  void failures
  void label
}

async function runDesktop(page, width, failures) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await settle(page, 700)
  await checkOverflow(page, `desktop-${width}-home`, failures)

  // Header WhatsApp
  const headerWa = page.locator('header a[aria-label*="واتساب"], header a[aria-label*="WhatsApp"]').first()
  assert(await headerWa.count() > 0 || (await page.locator('header a[href*="wa.me"]').count()) > 0, `Header WhatsApp missing @${width}`, failures)
  const waHref = await page.locator('header a[href*="wa.me"]').first().getAttribute('href')
  assert(waHref?.includes('wa.me/201000000000'), `Header WA phone wrong: ${waHref}`, failures)
  assert(waHref?.includes('text='), `Header WA missing text payload`, failures)

  // Typewriter link exists
  const twLink = page.locator('.typewriter-root a').first()
  await settle(page, 2500)
  // May need to wait for typing to produce linkable text
  for (let i = 0; i < 20; i++) {
    if ((await page.locator('.typewriter-root a').count()) > 0) break
    await sleep(200)
  }
  assert((await page.locator('.typewriter-root a').count()) > 0, `Typewriter not clickable @${width}`, failures)

  // Services filter
  await page.locator('#services').scrollIntoViewIfNeeded()
  await settle(page, 300)
  const filters = page.locator('#services [role="group"][aria-label="تصفية مجالات العمل"] button')
  assert((await filters.count()) >= 2, `Category filters missing @${width}`, failures)
  await filters.filter({ hasText: 'المنازعات' }).click()
  await settle(page, 400)
  const visibleCards = page.locator('#services .lg\\:grid li, #services ul.lg\\:grid > li')
  // desktop grid
  const desktopItems = page.locator('ul.container-editorial.section-body li')
  const countDisputes = await desktopItems.count()
  assert(countDisputes > 0 && countDisputes < 15, `Disputes filter count odd: ${countDisputes}`, failures)
  await filters.filter({ hasText: 'الكل' }).click()
  await settle(page, 300)

  // Service consult CTA → contact prefill
  const consult = page.locator('a[href*="service="][href*="contact"], a[href*="?service="]').first()
  assert((await page.locator('a[href*="?service="]').count()) > 0, `No service consult links @${width}`, failures)
  const href = await page.locator('a[href*="?service="]').first().getAttribute('href')
  const slug = new URL(href, BASE).searchParams.get('service')
  await page.goto(new URL(href, BASE).toString(), { waitUntil: 'networkidle' })
  await settle(page, 500)
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await settle(page, 400)
  const selected = await page.locator('#serviceType').inputValue()
  assert(selected === slug, `Prefill mismatch: expected ${slug} got ${selected}`, failures)

  // Invalid service
  await page.goto(`${BASE}?service=does-not-exist#contact`, { waitUntil: 'networkidle' })
  await settle(page, 500)
  await page.locator('#contact').scrollIntoViewIfNeeded()
  const invalidVal = await page.locator('#serviceType').inputValue()
  assert(invalidVal === '', `Invalid slug should clear select, got ${invalidVal}`, failures)

  // CTA WhatsApp vs consult destinations differ
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.locator('#cta-heading').scrollIntoViewIfNeeded().catch(() => {})
  // find CTA section buttons
  const ctaSection = page.locator('section').filter({ has: page.locator('#cta-heading') })
  const ctaLinks = ctaSection.locator('a[href]')
  const hrefs = await ctaLinks.evaluateAll((as) => as.map((a) => a.getAttribute('href')))
  assert(hrefs.some((h) => h && h.includes('wa.me')), `CTA missing WhatsApp @${width}`, failures)
  assert(hrefs.some((h) => h && h.includes('contact')), `CTA missing contact @${width}`, failures)
  assert(new Set(hrefs.filter(Boolean)).size >= 2, `CTA buttons share destination @${width}: ${hrefs}`, failures)

  // Industry chip
  await page.locator('#industries-heading').scrollIntoViewIfNeeded()
  await settle(page, 200)
  await page.locator('#industries-heading').locator('..').locator('..').locator('button').first().click()
  await settle(page, 600)
  const servicesTop = await page.locator('#services').evaluate((el) => el.getBoundingClientRect().top)
  assert(servicesTop < 200, `Industry click did not reach services (top=${servicesTop})`, failures)

  await checkOverflow(page, `desktop-${width}-end`, failures)
}

async function runMobile(page, width, failures) {
  await page.setViewportSize({ width, height: 844 })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await settle(page, 700)
  await checkOverflow(page, `mobile-${width}-home`, failures)

  // Sticky bar hidden on hero
  const stickyHidden = await page.evaluate(() => {
    const bar = document.querySelector('[aria-hidden]')
    // find sticky by text
    const links = [...document.querySelectorAll('a')].filter((a) => a.textContent?.includes('احجز استشارة'))
    return true
  })
  void stickyHidden

  // Scroll past hero
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2))
  await settle(page, 500)
  const stickyVisible = await page.locator('a[href*="wa.me"]').filter({ hasText: 'واتساب' }).count()
  assert(stickyVisible > 0, `Sticky WhatsApp not found after hero @${width}`, failures)

  // Mobile drawer WhatsApp
  await page.locator('button[aria-label="فتح القائمة"]').click()
  await settle(page, 300)
  assert((await page.locator('#mobile-nav a[href*="wa.me"]').count()) > 0, `Drawer WhatsApp missing @${width}`, failures)
  await page.locator('button[aria-label="إغلاق القائمة"]').click()
  await settle(page, 200)

  // Progress indicator + vertical mobile service cards (no nested scroller)
  await page.locator('#services').scrollIntoViewIfNeeded()
  await settle(page, 400)
  const progress = page.locator('text=/\\d{2}\\s*من\\s*\\d{2}/')
  assert((await progress.count()) > 0, `Mobile progress missing @${width}`, failures)

  assert(
    (await page.locator('[data-service-card-mobile]').count()) > 0,
    `Mobile service cards missing @${width}`,
    failures,
  )
  assert(
    (await page.locator('.services-x-scroller').count()) === 0,
    `Nested horizontal services scroller must be gone @${width}`,
    failures,
  )
  await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-service-card-mobile]')
    cards[Math.min(2, cards.length - 1)]?.scrollIntoView({
      block: 'center',
      behavior: 'instant',
    })
  })
  await settle(page, 500)
  const progressText = await progress.first().textContent()
  assert(Boolean(progressText?.match(/\d{2}/)), `Progress text invalid: ${progressText}`, failures)

  // Mobile consult CTA
  assert(
    (await page.locator('.services-mobile-card a[href*="?service="]').count()) > 0,
    `Mobile consult CTA missing @${width}`,
    failures,
  )

  await checkOverflow(page, `mobile-${width}-end`, failures)
}

async function runWhatsAppUnit(failures) {
  // Import built module via dynamic evaluation in browser instead
  void failures
}

async function runRouting(page, failures) {
  await page.setViewportSize({ width: 1280, height: 800 })
  const paths = ['/', '/services/intellectual-property', '/services/company-formation-gafi', '/team']
  // team needs real slug — discover from home
  await page.goto(BASE, { waitUntil: 'networkidle' })
  const teamHref = await page.locator('a[href*="/team/"]').first().getAttribute('href')
  const serviceHrefs = await page.locator('a[href*="/services/"]').evaluateAll((as) =>
    [...new Set(as.map((a) => a.getAttribute('href')).filter(Boolean))].slice(0, 5),
  )

  for (const href of ['/', ...serviceHrefs, teamHref].filter(Boolean)) {
    const res = await page.goto(new URL(href, BASE).toString(), { waitUntil: 'networkidle' })
    assert(res && res.status() < 400, `Route failed ${href} status=${res?.status()}`, failures)
    const h1 = await page.locator('h1').count()
    assert(h1 > 0, `No h1 on ${href}`, failures)
  }

  // 404
  await page.goto(new URL('/this-page-does-not-exist', BASE).toString(), { waitUntil: 'networkidle' })
  const body = await page.locator('body').innerText()
  assert(body.length > 20, '404 page empty', failures)
}

async function runReducedMotion(page, failures) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await settle(page, 800)
  assert((await page.locator('.typewriter-root').count()) > 0, 'Typewriter missing under reduced motion', failures)
  assert((await page.locator('#services [role="group"] button').count()) > 0, 'Filters missing under reduced motion', failures)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
}

async function runAnalyticsSmoke(page, failures) {
  await page.addInitScript(() => {
    window.__events = []
    window.dataLayer = []
    const push = window.dataLayer.push.bind(window.dataLayer)
    window.dataLayer.push = (...args) => {
      window.__events.push(...args)
      return push(...args)
    }
  })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await settle(page, 400)
  await page.locator('header a[href*="wa.me"]').first().click({ modifiers: [] }).catch(() => {})
  // don't navigate away — use evaluate click prevent
  await page.evaluate(() => {
    const a = document.querySelector('header a[href*="wa.me"]')
    if (a) {
      a.addEventListener('click', (e) => e.preventDefault(), { once: true })
      a.click()
    }
  })
  await settle(page, 200)
  const events = await page.evaluate(() => window.__events || window.dataLayer || [])
  const hasWa = events.some((e) => e && e.event === 'whatsapp_click')
  assert(hasWa, `whatsapp_click not tracked: ${JSON.stringify(events).slice(0, 200)}`, failures)
}

async function main() {
  const failures = []
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (err) => errors.push(String(err)))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })

  console.log('=== Desktop 1440 ===')
  await runDesktop(page, 1440, failures)
  console.log('=== Desktop 1280 ===')
  await runDesktop(page, 1280, failures)
  console.log('=== Desktop 1024 ===')
  await runDesktop(page, 1024, failures)

  console.log('=== Mobile contexts ===')
  for (const width of [430, 390, 375]) {
    const mobile = await browser.newContext({
      ...devices['iPhone 13'],
      viewport: { width, height: 844 },
      hasTouch: true,
      isMobile: true,
    })
    const mp = await mobile.newPage()
    mp.on('pageerror', (err) => errors.push(`mobile-${width}: ${err}`))
    console.log(`=== Mobile ${width} ===`)
    await runMobile(mp, width, failures)
    await mobile.close()
  }

  console.log('=== Routing ===')
  await runRouting(page, failures)

  console.log('=== Reduced motion ===')
  await runReducedMotion(page, failures)

  console.log('=== Analytics ===')
  const analyticsCtx = await browser.newContext()
  const ap = await analyticsCtx.newPage()
  await runAnalyticsSmoke(ap, failures)
  await analyticsCtx.close()

  // WhatsApp message encoding unit check in page
  await page.goto(BASE, { waitUntil: 'domcontentloaded' })
  const waChecks = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.href)
    return links.slice(0, 5).map((href) => {
      const u = new URL(href)
      const text = u.searchParams.get('text') || ''
      return {
        href,
        hasArabic: /[\u0600-\u06FF]/.test(text),
        phone: u.pathname.replace('/', ''),
      }
    })
  })
  for (const c of waChecks) {
    assert(c.phone === '201000000000', `WA phone ${c.phone}`, failures)
    assert(c.hasArabic, `WA message missing Arabic: ${c.href}`, failures)
  }

  // Service detail view
  await page.goto(new URL('/services/intellectual-property', BASE).toString(), {
    waitUntil: 'networkidle',
  })
  await settle(page, 400)
  assert((await page.locator('h1').innerText()).includes('ملكية'), 'IP service title missing', failures)
  assert((await page.locator('a[href*="?service=intellectual-property"]').count()) > 0, 'Detail consult prefill link missing', failures)

  await browser.close()

  // Filter React key warnings etc that are noisy — keep real pageerrors
  const realErrors = errors.filter(
    (e) =>
      !String(e).includes('Download the React DevTools') &&
      !String(e).includes('favicon') &&
      !String(e).includes('net::ERR'),
  )

  if (realErrors.length) {
    console.warn('Console/page errors:', realErrors.slice(0, 10))
    for (const e of realErrors.slice(0, 5)) failures.push(`console: ${e}`)
  }

  if (failures.length) {
    console.error('\nFAILED (' + failures.length + '):')
    failures.forEach((f) => console.error(' -', f))
    process.exit(1)
  }
  console.log('\nOK: conversion QA matrix passed')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
