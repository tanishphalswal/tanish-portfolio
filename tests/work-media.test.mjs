import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

test('folder images become ordered portfolio media with intrinsic dimensions', async () => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-media-'));
  try {
    const folder = join(root, 'portfolio', 'ui-ux', 'hrms');
    await mkdir(folder, { recursive: true });
    await sharp({ create: { width: 900, height: 600, channels: 3, background: '#263c55' } })
      .jpeg().toFile(join(folder, '02-employee-view.jpg'));
    await sharp({ create: { width: 1200, height: 800, channels: 3, background: '#263c55' } })
      .png().toFile(join(folder, '01-dashboard.png'));
    await writeFile(join(folder, 'notes.txt'), 'ignore');

    const { scanMedia } = await import('../lib/work-media.ts');
    assert.deepEqual(await scanMedia(root, 'ui-ux/hrms'), [
      { src: '/portfolio/ui-ux/hrms/01-dashboard.png', alt: 'HRMS — Dashboard', width: 1200, height: 800 },
      { src: '/portfolio/ui-ux/hrms/02-employee-view.jpg', alt: 'HRMS — Employee View', width: 900, height: 600 },
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('empty and missing folders return no media', async () => {
  const { scanMedia } = await import('../lib/work-media.ts');
  assert.deepEqual(await scanMedia('/missing', 'graphic-design/print'), []);
});
