import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Author } from './entities/author.entity'
import { Book } from './entities/book.entity'
import { SaleItem } from './entities/sale-item.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book, SaleItem])],
})
export class BookstoreModule {}
