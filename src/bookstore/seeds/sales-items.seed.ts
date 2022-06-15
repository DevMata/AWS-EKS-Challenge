import { Factory, Seeder } from 'typeorm-seeding'
import { SaleItem } from '../entities/sale-item.entity'

export default class SalesItemsSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(SaleItem)().createMany(15)
  }
}
