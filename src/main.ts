import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'
import * as timeout from 'connect-timeout'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(timeout('30s'))
  app.use(helmet())

  await app.listen(3000)
}
bootstrap()
