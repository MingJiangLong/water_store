import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ProductStatus } from 'src/shared/enum/ProductStatus';
export class CreateProductDto {
  @ApiProperty()
  @MaxLength(60, { message: "商品名称长度不能超过60个字符" })
  @IsNotEmpty({ message: "商品名称不能为空" })
  productName: string;

  @ApiProperty()
  @IsUrl({}, { message: "图片地址不合法" })
  @IsOptional()
  productPic: string;

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
  @IsNotEmpty({ message: "商品价格不能为空!" })
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
}
