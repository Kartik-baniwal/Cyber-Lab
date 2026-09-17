import { IOrchestratorDriver } from './orchestrator.interface';
import { KubernetesDriver } from './kubernetes.driver';
import { DockerDriver } from './docker.driver';
import { DevMockDriver } from './dev-mock.driver';
import { config } from '../config';
import { execSync } from 'child_process';

const DOCKER_BIN = process.env.DOCKER_BIN || (process.platform === 'darwin' ? '/usr/local/bin/docker' : 'docker');

function isDockerRunning(): boolean {
  try {
    execSync(`${DOCKER_BIN} ps`, { stdio: 'ignore', timeout: 3000 });
    return true;
  } catch {
    return false;
  }
}

export function getOrchestratorDriver(): IOrchestratorDriver {
  if (config.orchestratorType === 'kubernetes') {
    return new KubernetesDriver();
  }

  if (config.orchestratorType === 'dev-mock') {
    console.log('[Orchestrator] Explicitly configured for internal DevMockDriver.');
    return new DevMockDriver();
  }

  if (isDockerRunning()) {
    console.log('[Orchestrator] Active Docker daemon confirmed — initializing real DockerDriver.');
    return new DockerDriver();
  }

  console.log('[Orchestrator] Docker daemon unavailable or not running — falling back to internal DevMockDriver.');
  return new DevMockDriver();
}

export * from './orchestrator.interface';

