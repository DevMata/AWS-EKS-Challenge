import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './book.entity'

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ name: 'date_of_birth' })
  dateOfBirth: Date

  @OneToMany(() => Book, (book) => book.author)
  books: Book[]
}
