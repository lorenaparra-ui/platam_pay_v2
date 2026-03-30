import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * Localiza la raíz del monorepo (donde está `nest-cli.json`) y carga el `.env` único.
 * Opcional: un `.env` en `database/` puede complementar (no reemplaza) si se añade
 * `dotenv.config({ path: join(__dirname, '..', '.env') })` aquí; por defecto solo la raíz.
 */
function findMonorepoRoot(startDir: string): string | undefined {
  let dir = path.resolve(startDir);
  for (let i = 0; i < 16; i++) {
    if (fs.existsSync(path.join(dir, 'nest-cli.json'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return undefined;
}

const root =
  findMonorepoRoot(__dirname) ??
  findMonorepoRoot(process.cwd()) ??
  path.resolve(process.cwd());

const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}
