test('m3h <-> m/s conversions roundtrip', async () => {
  const { m3hToMs, msToM3h } = await import('../lib/conversions.js');
  const diam = 125; // mm
  const m3h = 360; // m3/h
  const v = m3hToMs(m3h, diam);
  const back = msToM3h(v, diam);
  expect(Math.round(back)).toBe(Math.round(m3h));
});

test('pa <-> mmCE conversions', async () => {
  const { paToMmce, mmceToPa } = await import('../lib/conversions.js');
  const pa = 98.1;
  const mm = paToMmce(pa);
  const back = mmceToPa(mm);
  expect(Math.abs(back - pa)).toBeLessThan(1e-6);
});
