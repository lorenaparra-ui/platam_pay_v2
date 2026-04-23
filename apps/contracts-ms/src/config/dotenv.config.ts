import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

function findRootFrom(startDir: string): string | undefined {
  let dir = path.resolve(startDir);
  for (let i = 0; i < 12; i++) {
    if (fs.existsSync(path.join(dir, 'nest-cli.json'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return undefined;
}

export function resolveMonorepoRoot(): string {
  return (
    findRootFrom(__dirname) ??
    findRootFrom(process.cwd()) ??
    path.resolve(process.cwd())
  );
}

const monorepoRoot = resolveMonorepoRoot();
export const MONOREPO_ENV_PATH = path.join(monorepoRoot, '.env');

if (fs.existsSync(MONOREPO_ENV_PATH)) {
  dotenv.config({ path: MONOREPO_ENV_PATH });
}
