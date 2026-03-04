import { Injectable } from "@nestjs/common";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);

@Injectable()
export class ApiKeyService {
  async generateApiKeyAndHash(): Promise<{
    apiKey: string;
    apiKeyHash: string;
  }> {
    const apiKey = randomBytes(32).toString("hex");
    const salt = randomBytes(16);
    const derivedKey = (await scrypt(apiKey, salt, 64)) as Buffer;
    const apiKeyHash = `${salt.toString("hex")}:${derivedKey.toString("hex")}`;

    return { apiKey, apiKeyHash };
  }

  async verify(apiKey: string, storedHash: string): Promise<boolean> {
    const [saltHex, hashHex] = storedHash.split(":");
    if (!saltHex || !hashHex) {
      return false;
    }

    const derivedKey = (await scrypt(
      apiKey,
      Buffer.from(saltHex, "hex"),
      64,
    )) as Buffer;
    const hashBuffer = Buffer.from(hashHex, "hex");
    if (derivedKey.length !== hashBuffer.length) {
      return false;
    }

    return timingSafeEqual(derivedKey, hashBuffer);
  }
}
