import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { AppController } from './app.controller'
import { BookstoreModule } from './bookstore/bookstore.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TerminusModule,
    BookstoreModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
