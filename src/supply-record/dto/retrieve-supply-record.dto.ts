import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class RetrieveSupplyRecordDto {
  @ApiProperty()
  @IsNotEmpty({ message: "商品Id不能为空" })
  productId: number
  pageSize: number
}