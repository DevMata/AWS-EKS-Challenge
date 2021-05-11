import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BookstoreModule } from './bookstore/bookstore.module'

@Module({
  imports: [TypeOrmModule.forRoot(), BookstoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
