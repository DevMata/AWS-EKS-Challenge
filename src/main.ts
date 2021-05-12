import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'
import * as timeout from 'connect-timeout'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
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
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: { target: false },
    }),
  )

  const options = new DocumentBuilder()
    .setTitle('Krikey Backend Challenge')
    .setDescription('Top 10 Authors')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(`${prefix}/reference`, app, document)

  await app.listen(port)
}
bootstrap()
