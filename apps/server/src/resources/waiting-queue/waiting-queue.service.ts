import {
  JoinWaitingQueueInput,
  LeaveWaitingQueueInput,
  WaitingQueueClient,
} from '@mytable/domain';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchemaFieldTypes } from 'redis';
import { EventsService } from 'src/events/events.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class WaitingQueueService implements OnModuleInit {
  private logger = new Logger();

  async onModuleInit() {
    await this.createWaitingQueueIfNotExists();
    // await this.createAttendedWaitingQueueIfNotExists();
  }

  constructor(
    private eventsService: EventsService,
    private redisService: RedisService
  ) {}

  private async createWaitingQueueIfNotExists(): Promise<void> {
    try {
      await this.redisService.pubClient.ft.create(
        'idx:waitingQueue',
        {
          '$.clientIdentifier': {
            type: SchemaFieldTypes.TEXT,
            AS: 'clientIdentifier',
          },
          '$.name': {
            type: SchemaFieldTypes.TEXT,
          },
          '$.tableSize': {
            type: SchemaFieldTypes.NUMERIC,
          },
          '$.createdAt': {
            type: SchemaFieldTypes.TEXT,
            AS: 'createdAt',
          },
        },
        {
          ON: 'JSON',
          PREFIX: 'waitingQueue:',
        }
      );
    } catch (error) {
      this.logger.error('idx:waitingQueue already exists!', error?.message);
    }

    // await this.redisService.pubClient.json.set('waitingQueue', '$', []);
  }

  // private async createAttendedWaitingQueueIfNotExists(): Promise<void> {
  //   const waitingQueueExists = !!(await this.redisService.pubClient.json.type(
  //     'attendedWaitingQueue'
  //   ));

  //   if (waitingQueueExists) return;

  //   await this.redisService.pubClient.ft.create(
  //     'idx:attendedWaitingQueue',
  //     {
  //       '$.clientIdentifier': {
  //         type: SchemaFieldTypes.TEXT,
  //         AS: 'clientIdentifier',
  //       },
  //       '$.name': {
  //         type: SchemaFieldTypes.TEXT,
  //       },
  //       '$.tableSize': {
  //         type: SchemaFieldTypes.NUMERIC,
  //       },
  //       '$.createdAt': {
  //         type: SchemaFieldTypes.TEXT,
  //       },
  //       '$.attendedAt': {
  //         type: SchemaFieldTypes.TEXT,
  //       },
  //     },
  //     {
  //       ON: 'JSON',
  //       PREFIX: 'attendedWaitingQueue',
  //     }
  //   );

  //   await this.redisService.pubClient.json.set('attendedWaitingQueue', '$', []);
  // }

  async joinWaitingQueue(info: JoinWaitingQueueInput) {
    const createdAt = Date.now().toString();

    await this.redisService.pubClient.json.set(
      `waitingQueue:${info.clientIdentifier}`,
      '$',
      {
        ...info,
        createdAt,
      } as WaitingQueueClient
    );

    this.eventsService.emitTo('joinWaitingQueue', 'waitingQueue', {
      ...info,
      createdAt,
    } as WaitingQueueClient);
  }

  async leaveWaitingQueue(info: LeaveWaitingQueueInput) {
    await this.redisService.pubClient.json.del(
      `waitingQueue:${info.clientIdentifier}`
    );

    this.eventsService.emitTo('leaveWaitingQueue', 'waitingQueue', info);
  }

  async attendWaitingQueue() {
    const attendedAt = Date.now().toString();

    const { documents } = await this.redisService.pubClient.ft.search(
      // @ts-ignore
      'idx:waitingQueue',
      '*',
      {
        LIMIT: {
          from: 0,
          size: 1,
        },
      }
    );

    const client = { ...documents[0].value } as WaitingQueueClient;

    await this.redisService.pubClient.json.del(
      `waitingQueue:${client.clientIdentifier}`
    );

    this.eventsService.emitTo('attendWaitingQueue', 'waitingQueue', {
      ...client,
      attendedAt,
    } as WaitingQueueClient);

    // await this.redisService.pubClient.json.set(
    //   `attendedWaitingQueue:${client.clientIdentifier}`,
    //   '$',
    //   {
    //     ...client,
    //     attendedAt,
    //   } as WaitingQueueClient
    // );
  }

  // async cleanWaitingQueue() {
  //   await this.redisService.pubClient.json.set('waitingQueue', '$', []);
  //   this.eventsService.emitTo('waitingQueueCleaned', 'waitingQueue', []);
  // }

  async getWaitingQueue() {
    const { documents } = await this.redisService.pubClient.ft.search(
      'idx:waitingQueue',
      '*'
    );

    return documents.reduce((accu, item) => {
      accu.push({ ...item.value });
      return accu;
    }, []);
  }
}
