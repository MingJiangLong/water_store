import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, MaxLength } from "class-validator";
import { ProductStatus } from "../../shared/enum/ProductStatus";

export class RetrieveProductDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(60, {
    message: "商品名称不能超过60"
  })
  productName: string;


  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: "商品重量只能为数字" })
  productWeight: number;

  @ApiProperty()
  @IsNumber({}, { message: '商品体积只能为数字' })
  @IsOptional()
  productSize: number;

  @ApiProperty()
  @IsNumber(void 0, { message: "商品价格只能为数字" })
  @IsOptional()
  productPrice: number;

  @ApiProperty()
  @IsNumber(void 0, { message: "商品价格只能为数字" })
  @IsOptional()
  readonly productStock: number;

  @ApiProperty()
  @IsEnum(ProductStatus, {
    message: "订单状态不合法!"
  })
  @IsOptional()
  productStatus: string;

  @ApiProperty()
  @IsOptional()
  lastProductId: number

  @IsNumber(void 0, { message: "pageSize只能为数字" })
  @IsOptional()
  pageSize: number
}
