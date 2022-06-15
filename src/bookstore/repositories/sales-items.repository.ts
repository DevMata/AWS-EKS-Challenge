import { EntityRepository, Repository } from 'typeorm'
import { SaleItem } from '../entities/sale-item.entity'
import { TopAuthorDto } from '../dto/response/top-author.dto'

@EntityRepository(SaleItem)
export class SalesItemsRepository extends Repository<SaleItem> {
  findTopAuthors(authorName?: string): Promise<TopAuthorDto[]> {
    const queryBuilder = this.createQueryBuilder('saleItem')
      .select('SUM(saleItem.item_price * saleItem.quantity)', 'revenue')
      .addSelect('author.id', 'id')
      .addSelect('author.name', 'name')
      .innerJoin('saleItem.book', 'book')
      .innerJoin('book.author', 'author')
      .groupBy('author.id')
      .orderBy('revenue', 'DESC')
      .limit(10)

    if (authorName) {
      queryBuilder.andWhere('name ilike :authorName', {
        authorName: `%${authorName}%`,
      })
    }

    return queryBuilder.getRawMany<TopAuthorDto>()
  }
}
