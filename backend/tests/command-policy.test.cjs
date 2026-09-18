const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { LINUX_SHELL_POLICY, PWD_BLOCKED_MESSAGE, blocksPwd } = require('../dist/services/command-policy');
const { DevMockDriver } = require('../dist/drivers/dev-mock.driver');

test('Linux policy rejects pwd, arguments, chains, and inherited Bash functions', () => {
  for (const command of ['pwd', 'pwd -P', 'true && pwd', '(pwd)', 'bash -c pwd']) {
    const result = spawnSync('/bin/bash', ['-c', `${LINUX_SHELL_POLICY}\n${command}`], { encoding: 'utf8' });
    assert.equal(result.status, 126, command);
    assert.equal(result.stdout, '', command);
    assert.equal(result.stderr.trim(), PWD_BLOCKED_MESSAGE, command);
  }
});

test('interactive shell blocks pasted pwd commands while preserving other commands', () => {
  const result = spawnSync('/bin/bash', ['--noprofile', '--norc', '-i'], {
    input: `${LINUX_SHELL_POLICY}\npwd\npwd -L\necho still-working\nexit\n`, encoding: 'utf8'
  });
  assert.equal(result.stdout.trim(), 'still-working');
  assert.equal(result.stderr.split(`${PWD_BLOCKED_MESSAGE}\n`).length - 1, 2);
});

test('restriction is specific to Linux fundamentals and the pwd command', async () => {
  const driver = new DevMockDriver();
  const linux = { labId: 'linux', lab: {}, os: 'Kali Linux' };
  assert.equal(blocksPwd(linux, ' pwd -L '), true);
  assert.equal(blocksPwd(linux, 'echo pwd'), false);
  assert.equal((await driver.executeCommand(linux, 'pwd')).exitCode, 126);
  for (const labId of ['recon', 'web', 'permissions', 'forensics', 'incident', 'kali-sandbox']) {
    const session = { ...linux, labId };
    assert.equal(blocksPwd(session, 'pwd'), false);
    assert.equal((await driver.executeCommand(session, 'pwd')).exitCode, 0);
  }
});
