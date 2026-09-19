export type LabLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type OperatingSystem = 'Kali Linux' | 'Ubuntu';
export type SessionStatus = 'provisioning' | 'active' | 'expired' | 'ended' | 'failed';

export interface ObjectiveDefinition {
  id: string;
  title: string;
  command: string;
  hint: string;
  isFlagObjective?: boolean;
}

export interface LabDefinition {
  allowedCommands?: string[];
  id: string;
  name: string;
  category: string;
  level: LabLevel;
  time: number; // in minutes
  icon: string;
  color: string;
  desc: string;
  tags: string[];
  os: OperatingSystem;
  tasks: string[];
  commands: string[];
  defaultFlagPattern: string; // Dynamic flag template
  workstationImage: string;
  targetImage?: string;
  targetPorts?: number[];
  objectives: ObjectiveDefinition[];
}

export interface EndpointSpecs {
  terminalWs: string;
  vncUrl: string;
  ideUrl: string;
  targetUrl?: string;
}

export interface LabSession {
  id: string;
  userId: string;
  labId: string;
  lab: LabDefinition;
  os: OperatingSystem;
  status: SessionStatus;
  dynamicFlag: string;
  completedObjectives: number[];
  createdAt: number;
  expiresAt: number;
  endedAt?: number;
  namespaceOrNetworkId: string;
  endpoints: EndpointSpecs;
  outputLog: string[];
}

export interface UserProgress {
  userId: string;
  completedLabs: {
    id: string;
    name: string;
    os: OperatingSystem;
    completedAt: number;
  }[];
  totalObjectivesCompleted: number;
}

export interface CommandResult {
  stdout: string;
  stderr?: string;
  exitCode: number;
}

export interface ProvisionedEnvironment {
  networkId: string;
  workstationId: string;
  targetId?: string;
  endpoints: EndpointSpecs;
}
