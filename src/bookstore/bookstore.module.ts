import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorsService } from './services/authors.service'
import { AuthorsController } from './authors.controller'
import { SalesItemsRepository } from './repositories/sales-items.repository'
import { AuthorsRepository } from './repositories/authors.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorsRepository, SalesItemsRepository]),
  ],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class BookstoreModule {}
