/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';





async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: "mqtts://mqtts.3pi-solutions.com:39001",
      username: "tomer",
      password: "tomer",
      ca: readFileSync('apps/api/src/environments/3pi-solutions-CA.crt'),
    },
  });

}

bootstrap();
