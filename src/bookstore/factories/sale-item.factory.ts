import { define, factory } from 'typeorm-seeding'
import Faker from 'faker'
import { SaleItem } from '../entities/sale-item.entity'
import { Book } from '../entities/book.entity'

define(SaleItem, (faker: typeof Faker) => {
  const price = +faker.commerce.price(10, 20, 2)
  const quantity = faker.random.number({ min: 1, max: 10 })
  const customerName = `${faker.name.firstName()} ${faker.name.lastName()}`
  const book = factory(Book)() as any

  const saleItem = new SaleItem()
  saleItem.itemPrice = price
  saleItem.quantity = quantity
  saleItem.customerName = customerName
  saleItem.book = book
  return saleItem
})
