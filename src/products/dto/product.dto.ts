import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../product.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class ProductDto {
  @ApiProperty()
  readonly productId: number;

  @ApiProperty()
  readonly productName: string;

  @ApiProperty()
  readonly productPic: string;

  @ApiProperty()
  readonly productWeight: number;

  @ApiProperty()
  readonly productSize: number;

  @ApiProperty()
  readonly productPrice: number;

  @ApiProperty()
  readonly productStock: number;

  @ApiProperty()
  readonly productStatus: string;

  constructor(product: Product) {
    const keys = Object.keys(product);
    keys.forEach(key => {
      this[key] = product[key]
    })
  }
}
