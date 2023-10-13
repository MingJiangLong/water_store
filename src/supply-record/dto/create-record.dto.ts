import { ApiProperty } from '@nestjs/swagger';
export class CreateSupplyRecordDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  supplyNumber: number;
}
