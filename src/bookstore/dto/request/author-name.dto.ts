import { IsOptional, IsString, MinLength } from 'class-validator'

export class AuthorNameDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly author_name?: string
}
