import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorsService } from './services/authors.service'
import { AuthorsController } from './authors.controller'
import { SalesItemsRepository } from './repositories/sales-items.repository'
import { AuthorsRepository } from './repositories/authors.repository'
import { CacheConfigService } from './utils/cache-config.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorsRepository, SalesItemsRepository]),
    CacheModule.registerAsync({ useClass: CacheConfigService }),
  ],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class BookstoreModule {}
