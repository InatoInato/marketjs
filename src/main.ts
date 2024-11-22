import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function server() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT ?? 3000);
  console.log(`Started in port: ${process.env.SERVER_PORT}`)
}
server();