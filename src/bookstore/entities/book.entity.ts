import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Author } from './author.entity'
import { SaleItem } from './sale-item.entity'

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  isbn: string

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'author_id' })
  author: Author

  @OneToMany(() => SaleItem, (saleItem) => saleItem.book)
  salesItems: SaleItem[]
}
