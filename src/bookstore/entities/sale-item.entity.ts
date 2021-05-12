import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Book } from './book.entity'

@Entity('sales_items')
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'customer_name', type: 'text' })
  customerName: string

  @Column({ name: 'item_price', type: 'money' })
  itemPrice: number

  @Column({ type: 'int' })
  quantity: number

  @ManyToOne(() => Book, (book) => book.salesItems)
  @JoinColumn({ name: 'book_id' })
  book: Book
}
