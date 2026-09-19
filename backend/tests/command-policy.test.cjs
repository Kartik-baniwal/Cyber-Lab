const {test} = require('node:test');
const assert = require('node:assert/strict');
const {blocksCommand, runnerForSession, isRestrictedLab} = require('../dist/services/command-policy');
const {LAB_CATALOG} = require('../dist/models/labs.data');
for (const labId of ['linux', 'recon', 'web']) {
 test(`${labId} exposes installed tools and a normal shell`, () => {
  const session = {labId, os:'Kali Linux'};
  for (const command of ['kali-tools web', 'kali-tools recon', 'kali-tools linux', 'nikto -Version', 'dnsrecon --help', 'sudo -n true', 'ls -la | head', 'python3 --version', 'bash -c pwd']) {
   assert.equal(blocksCommand(session, command), false, command);
  }
  assert.equal(runnerForSession(session), null);
  assert.equal(isRestrictedLab(session), false);
  assert.equal(LAB_CATALOG.find(lab => lab.id === labId).allowedCommands, undefined);
 });
}
