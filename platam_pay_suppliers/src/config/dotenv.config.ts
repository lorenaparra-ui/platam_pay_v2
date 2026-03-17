import * as fs from "fs";
import * as dotenv from "dotenv";
import * as path from "path";

const appRootPath = path.resolve(__dirname, "../../");
const envPath = path.resolve(appRootPath, "./.env");
const envDockerPath = path.resolve(appRootPath, "./.env.docker");

const dotenvPaths = [envPath, envDockerPath].filter((filePath) =>
  fs.existsSync(filePath),
);
dotenv.config({ path: dotenvPaths });
