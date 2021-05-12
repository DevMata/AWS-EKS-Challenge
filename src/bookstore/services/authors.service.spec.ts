import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { AuthorsRepository } from '../repositories/authors.repository'
import { SalesItemsRepository } from '../repositories/sales-items.repository'
import { AuthorsService } from './authors.service'

describe('AuthorsService', () => {
  let authorsService: AuthorsService
  let authorsRepository: AuthorsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: AuthorsRepository,
          useValue: { findAuthorByName: jest.fn() },
        },
        {
          provide: SalesItemsRepository,
          useValue: { findTopAuthors: jest.fn() },
        },
      ],
    }).compile()

    authorsService = module.get<AuthorsService>(AuthorsService)
    authorsRepository = module.get(AuthorsRepository)
  })

  it('should be defined', () => {
    expect(authorsService).toBeDefined()
  })

  describe('findTopAuthors', () => {
    it('should throw an exception if the searched author does not exist', async () => {
      jest.spyOn(authorsRepository, 'findAuthorByName').mockResolvedValue(null)

      await expect(
        authorsService.findTopAuthors({ author_name: 'any_name' }),
      ).rejects.toThrow(NotFoundException)
    })
  })
})
