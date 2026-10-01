#!/usr/bin/env node
/**
 * Run `nx dev|start` for a Next app after loading workspace + app env.
 * Ensures PORT comes from the app’s .env.local (see each app’s .env.example).
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.join(__dirname, '..');

/** App-specific port var; falls back to PORT, then defaultPort. */
const APP_PORT_ENV = {
    'parishbooks-client-ui': { key: 'CLIENT_UI_PORT', defaultPort: '3000' },
    'parishbooks-web-ui': { key: 'MARKETING_WEB_UI_PORT', defaultPort: '3001' },
};

const project = process.argv[2];
const target = process.argv[3] ?? 'dev';

if (!project || !APP_PORT_ENV[project]) {
    console.error('Usage: node scripts/run-next.mjs <parishbooks-client-ui|parishbooks-web-ui> [dev|start]');
    process.exit(1);
}

if (target !== 'dev' && target !== 'start') {
    console.error('Target must be dev or start');
    process.exit(1);
}

const appDir = path.join(workspaceRoot, 'apps', project);
dotenv.config({ path: path.join(workspaceRoot, '.env') });
dotenv.config({ path: path.join(workspaceRoot, '.env.local') });
dotenv.config({ path: path.join(appDir, '.env') });
dotenv.config({ path: path.join(appDir, '.env.local') });

const { key, defaultPort } = APP_PORT_ENV[project];
const port = process.env.PORT ?? process.env[key] ?? defaultPort;
process.env.PORT = port;
process.env[key] = process.env[key] ?? port;

const child = spawn('nx', [target, project], {
    cwd: workspaceRoot,
    stdio: 'inherit',
    env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 1));
