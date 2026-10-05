import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import path from 'node:path';
import { once } from 'node:events';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { loadWorkMedia } from '../../lib/work-media.ts';

// Temporary, synthetic test assets are removed in finally. They are never
// committed or presented as client work. Each run uses unique filenames.
async function makeFixtures() {
  const files = [];
  const prefix = `9900-browser-fixture-${Date.now()}-${process.pid}`;
  async function image(folder, number, width, height) {
    const destination = path.join(process.cwd(), 'public/portfolio', folder);
    await mkdir(destination, { recursive: true });
    const file = path.join(destination, `${prefix}-${String(number).padStart(2, '0')}.webp`);
    files.push(file);
    await sharp({ create: { width, height, channels: 3, background: '#27445e' } })
      .webp().toFile(file);
  }
  try {
    for (let i = 0; i < 40; i++) {
      const [width, height] = [[600, 900], [900, 600], [600, 600]][i % 3];
      await image('graphic-design/other', i, width, height);
    }
    for (let i = 0; i < 3; i++) await image('ui-ux/hrms', i, 900, 600);
    return files;
  } catch (error) {
    await Promise.all(files.map(file => rm(file, { force: true })));
    throw error;
  }
}

async function freePort() {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const port = server.address().port;
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  return port;
}

async function waitForServer(url, server, logs) {
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next.js exited: ${logs()}`);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (response.ok) return;
    } catch { /* The dev server is still starting. */ }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  throw new Error(`Next.js did not become ready: ${logs()}`);
}

async function noOverflow(page) {
  const widths = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  assert.ok(widths.document <= widths.viewport + 1, JSON.stringify(widths));
}

test('portfolio browser lifecycle', { timeout: 240_000 }, async t => {
  let files = [];
  let server;
  let browser;
  let context;
  let output = '';
  try {
    const originalMedia = await loadWorkMedia();
    const graphicCount = originalMedia.graphicWork.reduce((count, item) => count + (item.images?.length ?? 0), 0) + 40;
    const hrmsCount = (originalMedia.uiUxWork.find(item => item.id === 'hrms')?.images?.length ?? 0) + 3;
    files = await makeFixtures();
    const port = await freePort();
    const url = `http://127.0.0.1:${port}`;
    server = spawn(process.execPath, [
      'node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', String(port),
    ], { cwd: process.cwd(), env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
      detached: process.platform !== 'win32', stdio: ['ignore', 'pipe', 'pipe'] });
    server.stdout.on('data', data => { output = (output + data).slice(-12000); });
    server.stderr.on('data', data => { output = (output + data).slice(-12000); });
    await waitForServer(url, server, () => output);
    browser = await chromium.launch({
      headless: true,
      ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? {
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
        args: ['--no-sandbox', '--no-zygote', '--single-process', '--disable-dev-shm-usage'],
      } : {}),
    });
    context = await browser.newContext();
    async function browserPage(viewport = { width: 1280, height: 900 }) {
      const page = await context.newPage();
      await page.setViewportSize(viewport);
      return page;
    }

    await t.test('five categories, links, and responsive widths', async () => {
      for (const width of [1440, 768, 390]) {
        const page = await browserPage({ width, height: 900 });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(url);
        await page.getByRole('tab', { name: 'Web Apps' }).waitFor();
        assert.equal(await page.getByRole('tab').count(), 5);
        for (const label of ['Web Apps', 'Digital Marketing', 'UI/UX', 'Website Development', 'Graphic Design']) {
          await page.getByRole('tab', { name: label }).click();
          assert.equal(await page.getByRole('tab', { name: label }).getAttribute('aria-selected'), 'true');
          await noOverflow(page);
        }
        await page.getByRole('tab', { name: 'Website Development' }).click();
        const panel = page.getByRole('tabpanel');
        assert.equal(await panel.locator('article').count(), 4);
        assert.equal(await panel.getByRole('link', { name: 'Visit website' }).count(), 3);
        assert.equal(await panel.getByRole('link', { name: 'Visit Realty Vue website' }).count(), 0);
        const images = panel.getByRole('img');
        for (const image of await images.all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(img => img.decode());
          assert.ok(await image.evaluate(img => img.naturalWidth > 0));
        }
        if (process.env.PORTFOLIO_BROWSER_ARTIFACTS) {
          await mkdir(process.env.PORTFOLIO_BROWSER_ARTIFACTS, { recursive: true });
          await page.locator('#work').screenshot({
            path: path.join(process.env.PORTFOLIO_BROWSER_ARTIFACTS, `websites-${width}.png`),
            style: 'header { visibility: hidden; }',
          });
        }
        assert.deepEqual(errors, []);
        await page.close();
      }
    });

    await t.test('mobile menu closes on selection and Escape', async () => {
      const page = await browserPage({ width: 390, height: 844 });
      await page.goto(url);
      const toggle = page.getByRole('button', { name: 'Open menu' });
      await toggle.click();
      await page.locator('#mobile-navigation').getByRole('link', { name: 'Work', exact: true }).click();
      assert.equal(await page.locator('#mobile-navigation').count(), 0);
      await toggle.click();
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#mobile-navigation').count(), 0, 'Escape must dismiss mobile navigation');
      assert.equal(await toggle.evaluate(button => button === document.activeElement), true);
      await page.close();
    });

    await t.test('category keyboard arrows wrap and move focus', async () => {
      const page = await browserPage();
      await page.goto(url);
      const first = page.getByRole('tab', { name: 'Web Apps' });
      await first.focus();
      await page.keyboard.press('ArrowLeft');
      const last = page.getByRole('tab', { name: 'Graphic Design' });
      assert.equal(await last.getAttribute('aria-selected'), 'true');
      assert.equal(await last.evaluate(button => button === document.activeElement), true);
      await page.keyboard.press('ArrowRight');
      assert.equal(await first.getAttribute('aria-selected'), 'true');
      await page.close();
    });

    await t.test('40 graphics paginate 12 at a time and keep original image ratios', async () => {
      const page = await browserPage({ width: 1440, height: 1000 });
      await page.goto(url);
      await page.getByRole('tab', { name: 'Graphic Design' }).click();
      const gallery = page.locator('.portfolio-masonry');
      const cards = gallery.locator('button');
      assert.equal(await cards.count(), 12);
      for (let expected = Math.min(24, graphicCount); ; expected = Math.min(expected + 12, graphicCount)) {
        await page.getByRole('button', { name: /^Load more/ }).click();
        assert.equal(await cards.count(), expected);
        if (expected === graphicCount) break;
      }
      assert.equal(await page.getByRole('button', { name: /^Load more/ }).count(), 0);
      for (const image of await gallery.getByRole('img').all()) {
        assert.equal(await image.getAttribute('loading'), 'lazy');
        const ratio = await image.evaluate(img => {
          const rect = img.getBoundingClientRect();
          return { actual: rect.width / rect.height, expected: Number(img.getAttribute('width')) / Number(img.getAttribute('height')) };
        });
        assert.ok(Math.abs(ratio.actual - ratio.expected) < 0.015, JSON.stringify(ratio));
      }
      if (process.env.PORTFOLIO_BROWSER_ARTIFACTS) {
        await mkdir(process.env.PORTFOLIO_BROWSER_ARTIFACTS, { recursive: true });
        await gallery.screenshot({ path: path.join(process.env.PORTFOLIO_BROWSER_ARTIFACTS, 'graphic-ratios.png') });
      }
      await noOverflow(page);
      await page.close();
    });

    await t.test('viewer contains focus, preserves navigation focus, and restores the opener', async () => {
      const page = await browserPage();
      await page.goto(url);
      await page.getByRole('tab', { name: 'UI/UX' }).click();
      const opener = page.getByRole('button', { name: 'View HRMS design screens' });
      await opener.click();
      const dialog = page.getByRole('dialog');
      await dialog.waitFor();
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
        assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true, 'Tab focus must stay inside the viewer');
      }
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Shift+Tab');
        assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true, 'Shift+Tab focus must stay inside the viewer');
      }
      const next = dialog.getByRole('button', { name: 'Next image' });
      await next.click();
      assert.equal(await next.evaluate(button => button === document.activeElement), true, 'Image changes must not steal navigation focus');
      await page.keyboard.press('ArrowRight');
      assert.ok((await dialog.textContent()).includes(`3 / ${hrmsCount}`));
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      assert.ok((await dialog.textContent()).includes(`1 / ${hrmsCount}`));
      await page.keyboard.press('ArrowLeft');
      assert.ok((await dialog.textContent()).includes(`${hrmsCount} / ${hrmsCount}`));
      await page.keyboard.press('Escape');
      assert.equal(await dialog.count(), 0);
      assert.equal(await opener.evaluate(button => button === document.activeElement), true, 'Closing must restore opener focus');
      assert.equal(await page.evaluate(() => document.body.style.overflow), '');
      await page.close();
    });
  } finally {
    await Promise.all(files.map(file => rm(file, { force: true })));
    await browser?.close();
    if (server && server.exitCode === null) {
      const stop = signal => {
        try {
          if (process.platform === 'win32') server.kill(signal);
          else process.kill(-server.pid, signal);
        } catch (error) {
          if (error.code !== 'ESRCH') throw error;
        }
      };
      stop('SIGTERM');
      await Promise.race([once(server, 'exit'), new Promise(resolve => setTimeout(resolve, 5000))]);
      if (server.exitCode === null) stop('SIGKILL');
    }
    server?.stdout.destroy();
    server?.stderr.destroy();
    server?.unref();
  }
});
