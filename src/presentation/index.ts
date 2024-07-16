import { Global, Module } from '@nestjs/common';
import { ClientGrpcController } from './controllers/client-grpc';

@Global()
@Module({
  controllers: [
    ClientGrpcController
  ],
})
export class Presentation {}
