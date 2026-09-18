const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '../public/RangeForge-Project/app.js'), 'utf8');
const connection = source.slice(source.indexOf('function setBackendStatus('), source.indexOf('const KEY_COMPLETED_HISTORY'));
const cards = source.slice(source.indexOf('function renderCards()'), source.indexOf('function bindLaunch()'));

function page(fetch) {
  const elements = {
    '#api-status-badge': { innerHTML: '', style: {} },
    '#footer-status': { textContent: '' }
  };
  const context = vm.createContext({
    API_BASE: '', isLiveApi: false, labs: [], fetch,
    AbortSignal, console: { warn() {} },
    $: selector => elements[selector] || null,
    syncProgress: async () => {}
  });
  vm.runInContext(connection + cards, context);
  return { context, elements, check: options => context.checkBackend(options) };
}

test('health and catalog can complete on the login page without catalog elements', async () => {
  const { context, elements, check } = page(async url => ({
    ok: true, json: async () => url.endsWith('/health') ? { status: 'ok' } : [{ id: 'kali-sandbox' }]
  }));
  assert.equal(await check(), true);
  assert.equal(context.isLiveApi, true);
  assert.match(elements['#footer-status'].textContent, /^Connected/);
});

test('catalog and rendering errors do not mark a healthy backend offline', async () => {
  for (const failure of ['network', 'invalid', 'render']) {
    const { context, check } = page(async url => {
      if (url.endsWith('/health')) return { ok: true, json: async () => ({ status: 'ok' }) };
      if (failure === 'network') throw new Error('Catalog interrupted');
      return { ok: true, json: async () => failure === 'invalid' ? {} : [] };
    });
    if (failure === 'render') context.renderCards = () => { throw new Error('View changed'); };
    assert.equal(await check(), true, failure);
    assert.equal(context.isLiveApi, true, failure);
  }
});

test('failed health responses update both the badge and footer', async () => {
  const { context, elements, check } = page(async () => ({ ok: false, status: 503 }));
  context.setBackendStatus(true);
  assert.equal(await check(), false);
  assert.equal(context.isLiveApi, false);
  assert.match(elements['#api-status-badge'].innerHTML, /OFFLINE/);
  assert.match(elements['#footer-status'].textContent, /unavailable/);
});

test('launch retries a failed startup connection before provisioning Kali', async () => {
  let requests = 0;
  const { context, elements, check } = page(async () => {
    if (++requests === 1) throw new Error('Backend starting');
    return { ok: true, json: async () => ({ status: 'ok' }) };
  });
  assert.equal(await check(), false);
  elements['input[name="os"]:checked'] = { value: 'Kali Linux' };
  elements['#confirm-launch'] = {};
  elements['#launch-dialog'] = { close() {} };
  elements['#session-dot'] = { style: {} };
  Object.assign(context, {
    selected: { id: 'kali-sandbox', name: 'Kali' },
    recordSessionStart() {}, navigate() {}, toast() {}
  });
  const healthFetch = context.fetch;
  let provisioned = false;
  context.fetch = async (url, options) => {
    if (url.endsWith('/health')) return healthFetch(url, options);
    assert.equal(url, '/api/sessions');
    provisioned = true;
    return { ok: true, json: async () => ({ id: 'test-session', os: 'Kali Linux' }) };
  };
  const launch = source.slice(source.indexOf("$('#confirm-launch').onclick ="), source.indexOf("$('#launch-dialog').addEventListener('close'"));
  vm.runInContext(launch, context);
  await elements['#confirm-launch'].onclick();
  assert.equal(provisioned, true);
  assert.equal(context.session.id, 'test-session');
});
