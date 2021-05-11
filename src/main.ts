import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'
import * as timeout from 'connect-timeout'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const port = configService.get<string>('PORT')
  const prefix = configService.get<string>('PREFIX')

  app.use(timeout('30s'))
  app.use(helmet())
  app.enableCors()
  app.setGlobalPrefix(prefix)

  await app.listen(port)
}
bootstrap()
