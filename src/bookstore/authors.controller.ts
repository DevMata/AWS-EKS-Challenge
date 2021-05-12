import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { AuthorsService } from './services/authors.service'
import { TopAuthorDto } from './dto/response/top-author.dto'
import { AuthorNameDto } from './dto/request/author-name.dto'

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('top')
  findTopAuthors(
    @Query() authorNameDto: AuthorNameDto,
  ): Promise<TopAuthorDto[]> {
    return this.authorsService.findTopAuthors(authorNameDto)
  }
}
