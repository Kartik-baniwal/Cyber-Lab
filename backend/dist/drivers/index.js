"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrchestratorDriver = getOrchestratorDriver;
const kubernetes_driver_1 = require("./kubernetes.driver");
const docker_driver_1 = require("./docker.driver");
const dev_mock_driver_1 = require("./dev-mock.driver");
const config_1 = require("../config");
const child_process_1 = require("child_process");
const DOCKER_BIN = process.env.DOCKER_BIN || (process.platform === 'darwin' ? '/usr/local/bin/docker' : 'docker');
function isDockerRunning() {
    try {
        (0, child_process_1.execSync)(`${DOCKER_BIN} ps`, { stdio: 'ignore', timeout: 3000 });
        return true;
    }
    catch {
        return false;
    }
}
function getOrchestratorDriver() {
    if (config_1.config.orchestratorType === 'kubernetes') {
        return new kubernetes_driver_1.KubernetesDriver();
    }
    if (config_1.config.orchestratorType === 'dev-mock') {
        console.log('[Orchestrator] Explicitly configured for internal DevMockDriver.');
        return new dev_mock_driver_1.DevMockDriver();
    }
    if (isDockerRunning()) {
        console.log('[Orchestrator] Active Docker daemon confirmed — initializing real DockerDriver.');
        return new docker_driver_1.DockerDriver();
    }
    throw new Error('Docker is unavailable. Start Docker and build the full Kali image.');
}
__exportStar(require("./orchestrator.interface"), exports);
