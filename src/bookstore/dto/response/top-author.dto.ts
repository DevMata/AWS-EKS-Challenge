import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class TopAuthorDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly name: string

  @Expose()
  readonly revenue: string
}
