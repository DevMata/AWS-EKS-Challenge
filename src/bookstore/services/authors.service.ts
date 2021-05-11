import { Injectable } from '@nestjs/common'
import { TopAuthorDto } from '../dto/response/top-author.dto'
import { AuthorsRepository } from '../repositories/authors.repository'
import { SalesItemsRepository } from '../repositories/sales-items.repository'

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorsRepository: AuthorsRepository,
    private readonly salesItemsRepository: SalesItemsRepository,
  ) {}

  async findTopAuthors(): Promise<TopAuthorDto[]> {
    return this.salesItemsRepository.findTopAuthors()
  }
}
