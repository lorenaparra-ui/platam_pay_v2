import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

const appRootPath = path.resolve(__dirname, '../../');
const envPath = path.resolve(appRootPath, './.env');
const envDockerPath = path.resolve(appRootPath, './.env.docker');

const dotenvPaths = [envPath, envDockerPath].filter((filePath) => fs.existsSync(filePath));
dotenv.config({ path: dotenvPaths });