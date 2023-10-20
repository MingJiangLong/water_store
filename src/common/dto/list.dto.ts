import { IsOptional } from "class-validator";
import { BaseDto } from "./base.dto";

export class ListDto extends BaseDto {
  
  @IsOptional()
  lastId: number

  @IsOptional()
  pageSize: number
}