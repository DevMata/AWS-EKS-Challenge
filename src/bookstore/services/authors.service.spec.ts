import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { name, random, finance } from 'faker'
import { AuthorsRepository } from '../repositories/authors.repository'
import { SalesItemsRepository } from '../repositories/sales-items.repository'
import { AuthorsService } from './authors.service'

describe('AuthorsService', () => {
  let authorsService: AuthorsService
  let authorsRepository: AuthorsRepository
  let salesItemsRepository: SalesItemsRepository

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
    salesItemsRepository = module.get(SalesItemsRepository)
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

    it('should return an array of authors', async () => {
      const authors = [...Array(5)].map(() => ({
        id: random.number(),
        name: `${name.firstName()} ${name.lastName()}`,
        revenue: finance.amount(),
      }))

      jest
        .spyOn(salesItemsRepository, 'findTopAuthors')
        .mockResolvedValue(authors)

      const topAuthors = await authorsService.findTopAuthors({})
      expect(topAuthors).toHaveLength(5)
    })
  })
})
