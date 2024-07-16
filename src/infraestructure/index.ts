import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { MongodbConnection } from './connections/mongodb';
import { Repository } from './repositories/repository';
import { models } from './config/models';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    MongodbConnection,
    PrismaClient,
    ...models.map(entity => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => new Repository(prisma, entity),
      inject: [PrismaClient],
    })),
  ],
  exports: [
    MongodbConnection,
    PrismaClient,
    ...models.map(entity => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => new Repository(prisma, entity),
      inject: [PrismaClient],
    })),
  ],
})
export class Infraestructure {}
