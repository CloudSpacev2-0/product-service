const test = require('node:test');
const assert = require('node:assert');
const app = require('./server');

let server;
let base;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => server.close());

test('GET /health', async () => {
  const res = await fetch(`${base}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok', service: 'product-service' });
});

test('GET /api/products returns a list with CORS header', async () => {
  const res = await fetch(`${base}/api/products`, { headers: { Origin: 'http://example.com' } });
  assert.strictEqual(res.status, 200);
  assert.ok(res.headers.get('access-control-allow-origin'));
  const body = await res.json();
  assert.ok(Array.isArray(body) && body.length > 0);
});

test('GET /api/products/:id found and not found', async () => {
  assert.strictEqual((await fetch(`${base}/api/products/1`)).status, 200);
  assert.strictEqual((await fetch(`${base}/api/products/999`)).status, 404);
});
