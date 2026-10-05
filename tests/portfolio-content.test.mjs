import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { experience } from '../lib/data.ts';
import * as work from '../lib/work-data.ts';

const { categories, webApps, websites, uiUxWork, graphicWork, marketingWork } = work;

test('experience presents the three employers in reverse chronological order', () => {
  assert.deepEqual(experience.map(({ company, role, period }) => ({ company, role, period })), [
    { company: 'Calance', role: 'MERN Stack Developer', period: 'Sep 2026 — Present' },
    { company: 'Cross Learning', role: 'MERN Stack Developer', period: 'Jul 2026 — Sep 2026' },
    { company: 'Cut Edge Technology Pvt. Ltd.', role: 'Full-Stack Developer & DevOps Engineer', period: 'Nov 2022 — Jul 2026' },
  ]);
  assert.equal(experience[0].website, 'https://www.calanceus.com/');
  assert.equal(experience[1].website, 'https://crosslearning.in/');
});

test('work categories preserve existing web apps and add ERP', () => {
  assert.deepEqual(categories.map(c => c.id), ['webapps', 'marketing', 'uiux', 'websites', 'graphic']);
  assert.deepEqual(webApps.map(p => p.id), ['manetor', 'trackops', 'setlup', 'suppkart', 'erp']);
  assert.deepEqual(uiUxWork.map(p => p.id), ['reality-vue', 'random-it-solution', 'leecots', 'mukherjee-global', 'hrms']);
  assert.ok(Array.isArray(marketingWork));
  assert.ok(Array.isArray(graphicWork));
});

test('website cards have actual local screenshots or a truthful in-progress state', () => {
  assert.deepEqual(websites.map(p => p.id), ['cross-learning', 'calance-training', 'reality-vue', 'cut-edge-technology']);
  for (const site of websites) {
    if (site.status === 'In progress') {
      assert.equal(site.liveUrl, undefined);
      continue;
    }
    assert.match(site.cover, /^\/portfolio\/websites\/[^/]+\/home\.jpg$/);
    assert.ok(existsSync(join(process.cwd(), 'public', site.cover)), `${site.id} screenshot missing`);
    assert.match(site.liveUrl, /^https:\/\//);
  }
});

test('future media manifests do not expose placeholder URLs or missing assets', () => {
  for (const entry of [...uiUxWork, ...graphicWork, ...marketingWork]) {
    for (const media of entry.images ?? []) {
      assert.ok(existsSync(join(process.cwd(), 'public', media.src)), `${media.src} missing`);
      assert.ok(media.alt?.trim());
      assert.ok(media.width > 0 && media.height > 0);
    }
    assert.doesNotMatch(JSON.stringify(entry), /REPLACE_|Drop image|example\.com/);
  }
});
