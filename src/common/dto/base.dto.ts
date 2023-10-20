import { IsOptional } from "class-validator"

export class BaseDto {

  @IsOptional()
  id: number

  @IsOptional()
  createAt: Date

  @IsOptional()
  updateAt: Date
}