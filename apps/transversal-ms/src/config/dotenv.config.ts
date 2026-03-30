import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

/**
 * Resuelve la raíz del monorepo (donde vive el `.env` único).
 * No usar `../../` desde `dist/.../config`: en compilación apunta a `dist/`, no al repo.
 */
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

/**
 * Webpack puede dejar `__dirname` en un valor poco útil; `npm run start:dev` suele
 * ejecutarse con cwd en `apps/transversal-ms`. Se prueba desde ambos puntos de partida.
 */
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
