import { Global, Module } from '@nestjs/common';
import { ClientFactory } from './factories/client';

@Global()
@Module({
  providers: [
    ClientFactory
  ],
  exports: [
    ClientFactory
  ],
})
export class Domain {}
