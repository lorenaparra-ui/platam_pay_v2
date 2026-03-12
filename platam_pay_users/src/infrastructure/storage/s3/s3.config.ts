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

  getConfig(): S3Config {
    const region = this.configService.get<string>(`${CONFIG_KEY}.region`);
    const bucket = this.configService.get<string>(`${CONFIG_KEY}.bucket`);

    if (!bucket) {
      throw new Error('Missing S3 bucket configuration (config.storage.s3.bucket)');
    }

    return {
      region: region ?? 'us-east-1',
      bucket,
      endpoint: this.configService.get<string>(`${CONFIG_KEY}.endpoint`),
      force_path_style: this.configService.get<boolean>(`${CONFIG_KEY}.force_path_style`),
      credentials: this.getCredentials(),
    };
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
