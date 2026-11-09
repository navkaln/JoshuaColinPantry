// QA: a11y (axe), no horizontal scroll, noindex, privacy, placeholders, links, image weight.
// Usage: npm run build && npm run qa
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const PORT = 4399, BASE = `http://localhost:${PORT}`;
const PAGES = ['/', '/building/', '/amenities/', '/contact/'];
const WIDTHS = [[375, 'phone'], [768, 'tablet'], [1280, 'desktop']];
const fails = [];
const check = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) fails.push(msg); };

const srv = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore' });
for (let i = 0; i < 40; i++) { try { if ((await fetch(BASE)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 250)); }

const robots = await (await fetch(`${BASE}/robots.txt`)).text();
check(/Disallow:\s*\/\s*$/m.test(robots), 'robots.txt blocks all crawlers');

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const seen = new Set(PAGES);
for (const path of PAGES) {
  for (const [w, label] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    if (w === 375) {
      check(res.ok(), `${path} loads`);
      check(!!(await page.$('meta[name=robots][content*=noindex]')), `${path} has noindex meta`);
      const html = await page.content();
      check(!/[\w.+-]+@[\w-]+\.[\w.]+/.test(html.replace(/<script[\s\S]*?<\/script>/g, '')), `${path} shows no email address`);
      check(!/\bunit\s*#?\d|apt\.?\s*\d|\$\d|luxury|most desirable|investment/i.test(html), `${path} has no unit numbers, prices or listing words`);
      const imgs = await page.$$eval('img', (els) => els.map((e) => e.getAttribute('alt')));
      check(imgs.every((a) => a && a.length > 5), `${path} all images have alt text (${imgs.length})`);
      const phUnmarked = await page.$$eval('img', (els) => els.filter((e) => /placeholder/i.test(e.alt) && !e.closest('[data-placeholder]')).length);
      check(phUnmarked === 0, `${path} placeholder images are tagged data-placeholder`);
      const tagless = await page.$$eval('[data-placeholder]', (els) => els.filter((e) => !e.querySelector('.ph-tag')).length);
      check(tagless === 0, `${path} every data-placeholder shows a visible tag`);
      const h1 = await page.$$eval('h1', (e) => e.length);
      check(h1 === 1, `${path} has exactly one h1`);
      const links = await page.$$eval('a[href]', (a) => a.map((x) => x.getAttribute('href')));
      for (const h of links.filter((h) => h.startsWith('/'))) {
        if (seen.has(h)) continue; seen.add(h);
        check((await fetch(BASE + h)).ok, `link ${h} resolves`);
      }
      const t0 = await page.evaluate(() => performance.getEntriesByType('resource').filter((r) => r.initiatorType === 'img').reduce((s, r) => s + r.transferSize, 0));
      check(t0 < 1_500_000, `${path} image transfer ${(t0 / 1024) | 0} kB at phone width (<1.5 MB)`);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    check(!overflow, `${path} no horizontal scroll at ${label} (${w}px)`);
    if (w === 375) {
      const gutter = await page.evaluate(() => Math.min(...[...document.querySelectorAll('main .wrap')].map((e) => parseFloat(getComputedStyle(e).paddingLeft))));
      check(gutter >= 16 || !isFinite(gutter), `${path} side gutter >= 16px (${gutter}px)`);
    }
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    check(axe.violations.length === 0, `${path} axe WCAG 2.1 AA at ${label}${axe.violations.length ? ': ' + axe.violations.map((v) => v.id).join(', ') : ''}`);
    await ctx.close();
  }
}
// Keyboard: first Tab reaches skip link, focus ring is visible
{
  const page = await browser.newPage();
  await page.goto(BASE + '/');
  await page.keyboard.press('Tab');
  check((await page.evaluate(() => document.activeElement?.className)) === 'skip-link', 'first Tab stops on skip link');
  await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  check(outline !== 'none', 'focused nav link has visible outline');
}
await browser.close(); srv.kill();
console.log(fails.length ? `\n${fails.length} check(s) failed` : '\nAll checks passed');
process.exit(fails.length ? 1 : 0);
