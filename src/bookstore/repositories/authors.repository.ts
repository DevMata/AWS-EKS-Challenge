import { EntityRepository, Repository } from 'typeorm'
import { Author } from '../entities/author.entity'

@EntityRepository(Author)
export class AuthorsRepository extends Repository<Author> {
  findAuthorByName(authorName: string): Promise<Author> {
    return this.createQueryBuilder('author')
      .where('author.name ilike :authorName', {
        authorName: `%${authorName}%`,
      })
      .getOne()
  }
}
