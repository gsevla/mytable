import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger();

  public pubClient = createClient({ url: `redis://localhost:6379` });

  public subClient = this.pubClient.duplicate();

  private async connectToRedis(): Promise<void> {
    await Promise.all([this.pubClient.connect(), this.subClient.connect()]);
  }

  private async disconnectFromRedis(): Promise<void> {
    await Promise.all([
      this.subClient.disconnect(),
      this.pubClient.disconnect(),
    ]);
  }

  async onModuleInit() {
    await this.connectToRedis();
    this.logger.debug('Connected to redis!');
  }

  async onModuleDestroy() {
    await this.disconnectFromRedis();
    this.logger.debug('Disconnected from redis!');
  }
}
