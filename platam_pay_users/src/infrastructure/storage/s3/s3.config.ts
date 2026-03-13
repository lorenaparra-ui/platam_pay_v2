import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface S3Config {
  region: string;
  bucket: string;
  endpoint?: string;
  force_path_style?: boolean;
  credentials?: {
    access_key_id: string;
    secret_access_key: string;
  };
}

const CONFIG_KEY = 'config.storage.s3';

@Injectable()
export class S3ConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Indica si S3 está configurado (bucket definido).
   * Permite arrancar la aplicación sin S3 en desarrollo.
   */
  isConfigured(): boolean {
    const bucket = this.configService.get<string>(`${CONFIG_KEY}.bucket`);
    return typeof bucket === 'string' && bucket.trim().length > 0;
  }

  /**
   * Devuelve la configuración S3 o null si el bucket no está definido.
   */
  getConfigOrNull(): S3Config | null {
    const region = this.configService.get<string>(`${CONFIG_KEY}.region`);
    const bucket = this.configService.get<string>(`${CONFIG_KEY}.bucket`);

    if (!bucket || String(bucket).trim().length === 0) {
      return null;
    }

    return {
      region: region ?? 'us-east-1',
      bucket: bucket.trim(),
      endpoint: this.configService.get<string>(`${CONFIG_KEY}.endpoint`),
      force_path_style: this.configService.get<boolean>(`${CONFIG_KEY}.force_path_style`),
      credentials: this.getCredentials(),
    };
  }

  /**
   * Devuelve la configuración S3. Lanza si el bucket no está definido.
   */
  getConfig(): S3Config {
    const config = this.getConfigOrNull();
    if (!config) {
      throw new Error(
        'Missing S3 bucket configuration (config.storage.s3.bucket). Set AWS_S3_BUCKET.',
      );
    }
    return config;
  }

  private getCredentials(): S3Config['credentials'] | undefined {
    const access_key_id = this.configService.get<string>(`${CONFIG_KEY}.access_key_id`);
    const secret_access_key = this.configService.get<string>(`${CONFIG_KEY}.secret_access_key`);

    if (access_key_id && secret_access_key) {
      return { access_key_id, secret_access_key };
    }
    return undefined;
  }
}
