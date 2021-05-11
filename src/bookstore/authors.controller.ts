import { Controller, Get } from '@nestjs/common'
import { AuthorsService } from './services/authors.service'

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get('top')
  findTopAuthors(): Promise<any> {
    return this.authorsService.findTopAuthors()
  }
}
