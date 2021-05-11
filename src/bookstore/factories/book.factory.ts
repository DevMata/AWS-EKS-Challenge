import Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { Book } from '../entities/book.entity'
import { Author } from '../entities/author.entity'

define(Book, (faker: typeof Faker) => {
  const isbn = faker.random.uuid()
  const author = factory(Author)() as any

  const book = new Book()
  book.isbn = isbn
  book.author = author
  return book
})
