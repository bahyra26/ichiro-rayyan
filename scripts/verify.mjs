import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const read = (p) => fs.readFileSync(p, 'utf8');

// 1. Check relative asset paths exist in public/ and use no leading '/'
const filesToScan = [
  'src/data/regionVideos.ts',
  'src/data/evaluationMetrics.ts',
  'src/components/Navbar.tsx',
  'src/components/Footer.tsx',
];
for (const file of filesToScan) {
  const text = read(file);
  for (const m of text.matchAll(/(?:src|poster|stillSrc|videoSrc|pdfPath):\s*'([^']+)'|src="([^"]+)"/g)) {
    const asset = m[1] || m[2];
    if (!asset || asset.startsWith('http')) continue;
    assert.ok(!asset.startsWith('/'), `${file}: asset "${asset}" must be relative (no leading /)`);
    const diskPath = path.join('public', asset);
    assert.ok(fs.existsSync(diskPath), `${file}: missing public asset "${diskPath}"`);
  }
}

// 2. Verify region clip lineup (6 standard + 6 fast + 2 walk-back, R0..R5)
const videosSrc = read('src/data/regionVideos.ts');
for (const id of [
  'std_r0', 'std_r1', 'std_r2', 'std_r3', 'std_r4', 'std_r5',
  'fast_r0', 'fast_r1', 'fast_r2', 'fast_r3', 'fast_r4', 'fast_r5',
  'walkback_fast_r2', 'walkback_fast_r1',
]) {
  assert.ok(videosSrc.includes(`'${id}'`), `Missing clip id: ${id}`);
}

// 3. Verify evaluation numbers match committed benchmark totals
const metricsSrc = read('src/data/evaluationMetrics.ts');
const speedPairs = [...metricsSrc.matchAll(/saved:\s*(\d+),\s*total:\s*(\d+)/g)].map(
  ([, s, t]) => [Number(s), Number(t)]
);
assert.equal(speedPairs.length, 4, 'Expected 4 speed bands');
const totalSaved = speedPairs.reduce((a, [s]) => a + s, 0);
const totalShots = speedPairs.reduce((a, [, t]) => a + t, 0);
assert.equal(totalSaved, 2206);
assert.equal(totalShots, 4312);

const regionQuads = [
  ...metricsSrc.matchAll(/stdSaved:\s*(\d+),\s*stdTotal:\s*(\d+),\s*fastSaved:\s*(\d+),\s*fastTotal:\s*(\d+)/g),
].map(([, ss, st, fs_, ft]) => [Number(ss), Number(st), Number(fs_), Number(ft)]);
assert.equal(regionQuads.length, 6, 'Expected 6 regions');
assert.equal(
  regionQuads.reduce((a, [ss, , fs_]) => a + ss + fs_, 0),
  2206,
  'Per-region saves must equal 4-band total (2,206)'
);

console.log('verify OK: relative assets exist, 14+1 clip slots and benchmark sums match.');
