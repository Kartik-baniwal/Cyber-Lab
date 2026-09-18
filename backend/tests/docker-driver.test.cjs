const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kali-driver-'));
const cli = path.join(root, 'docker');
const log = path.join(root, 'calls.jsonl');
fs.writeFileSync(cli, `#!${process.execPath}
const fs = require('node:fs');
const args = process.argv.slice(2);
fs.appendFileSync(process.env.TEST_DOCKER_LOG, JSON.stringify(args) + '\\n');
if (args[0] === 'inspect') process.exit(1);
if (args[0] === 'image' && process.env.TEST_MISSING_IMAGE) process.exit(1);
if (args[0] === 'exec' && args.at(-1) === 'dig example.test') console.log('REAL_DOCKER_RESULT');
`);
fs.chmodSync(cli, 0o755);
process.env.DOCKER_BIN = cli;
process.env.TEST_DOCKER_LOG = log;
const { DockerDriver } = require('../dist/drivers/docker.driver');
const session = { id: 'test1234-session', os: 'Kali Linux', dynamicFlag: 'RANGE{test}' };
after(() => fs.rmSync(root, { recursive: true, force: true }));
test('provisions full image with 4 CPU and 3.5 GiB limits and preserves sudo', async () => {
  await new DockerDriver().provisionSession(session);
  const calls = fs.readFileSync(log, 'utf8').trim().split('\n').map(JSON.parse);
  const run = calls.find(args => args[0] === 'run');
  assert.equal(run[run.indexOf('--cpus') + 1], '4');
  assert.equal(run[run.indexOf('--memory') + 1], '3584m');
  assert.equal(run[run.indexOf('--memory-swap') + 1], '3584m');
  assert.ok(run.includes('rangeforge/kali-custom:latest'));
  assert.ok(!JSON.stringify(calls).includes('/usr/bin/sudo'));
});
test('DNS commands execute through Docker instead of simulated responses', async () => {
  const result = await new DockerDriver().executeCommand(session, 'dig example.test');
  assert.equal(result.stdout.trim(), 'REAL_DOCKER_RESULT');
});
test('missing full image fails rather than using bare Kali', async () => {
  process.env.TEST_MISSING_IMAGE = '1';
  try {
    await assert.rejects(new DockerDriver().provisionSession(session), /Full Kali image.*missing/);
  } finally { delete process.env.TEST_MISSING_IMAGE; }
});
test('Ubuntu selection provisions a separate Ubuntu image and hostname', async () => {
  const offset = fs.readFileSync(log, 'utf8').length;
  await new DockerDriver().provisionSession({ ...session, id: 'ubuntu12-session', os: 'Ubuntu' });
  const calls = fs.readFileSync(log, 'utf8').slice(offset).trim().split('\n').map(JSON.parse);
  const run = calls.find(args => args[0] === 'run');
  assert.ok(run.includes('cyberrange/workstation-ubuntu:latest'));
  assert.equal(run[run.indexOf('--hostname') + 1], 'ubuntu');
  assert.ok(!JSON.stringify(calls).includes('rangeforge/kali-custom'));
});
test('missing Ubuntu image reports its own build script without falling back to Kali', async () => {
  process.env.TEST_MISSING_IMAGE = '1';
  try {
    await assert.rejects(new DockerDriver().provisionSession({ ...session, os: 'Ubuntu' }), /Ubuntu image.*build-ubuntu-image.sh/);
  } finally { delete process.env.TEST_MISSING_IMAGE; }
});
