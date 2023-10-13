import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class SupplyProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: "补货商品Id不能为空" })
  productId: number;

  @ApiProperty()
  @IsNumber({}, { message: "补货数量只能为数字" })
  @Min(1, { message: "补货数量大于等于1" })
  @IsInt({ message: "补货数只能为整数" })
  supplyNumber: number
}
