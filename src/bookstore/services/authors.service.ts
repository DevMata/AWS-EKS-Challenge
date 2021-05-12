import { Injectable, NotFoundException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { TopAuthorDto } from '../dto/response/top-author.dto'
import { AuthorsRepository } from '../repositories/authors.repository'
import { SalesItemsRepository } from '../repositories/sales-items.repository'
import { AuthorNameDto } from '../dto/request/author-name.dto'

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorsRepository: AuthorsRepository,
    private readonly salesItemsRepository: SalesItemsRepository,
  ) {}

  async findTopAuthors({
    author_name,
  }: AuthorNameDto): Promise<TopAuthorDto[]> {
    if (author_name) {
      const author = await this.authorsRepository.findAuthorByName(author_name)
      if (!author) {
        throw new NotFoundException('The author does not exist')
      }
    }

    const topAuthors = await this.salesItemsRepository.findTopAuthors(
      author_name,
    )
    return plainToClass(TopAuthorDto, topAuthors)
  }
}
