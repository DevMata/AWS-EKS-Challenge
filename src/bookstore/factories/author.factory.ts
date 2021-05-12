import { define } from 'typeorm-seeding'
import Faker from 'faker'
import { Author } from '../entities/author.entity'

define(Author, (faker: typeof Faker) => {
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`
  const dateOfBirth = faker.date.past()

  const author = new Author()
  author.name = name
  author.dateOfBirth = dateOfBirth
  return author
})
