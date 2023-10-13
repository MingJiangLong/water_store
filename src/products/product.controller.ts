import { Body, Controller, HttpCode, Post, Delete, Query, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";
import { RetrieveProductDto } from "./dto/retrieve-product.dto";
import { SupplyProductDto } from "./dto/supply-product.dto";
import { SupplyRecordService } from "../supply-record/supply-record.service";

@Controller('product')
@ApiTags('product')
export class ProductController {

  constructor(
    private readonly supplyRecordService: SupplyRecordService,
    private readonly productService: ProductService,
  ) { }

  @Post('create')
  @HttpCode(200)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }


  @Delete('/:productId/delete')
  deleteProduct(@Param("productId") productId: number) {
    return this.productService.delete(productId)
  }


  @Get('list')
  getProductList(@Query() options: RetrieveProductDto) {
    return this.productService.findAbleProductBy(options)
  }

  @Post('supply')
  supply(@Body() options: SupplyProductDto) {
    return this.productService.supplyProduct(options.productId, options.supplyNumber);
  }

  @Get('/:productId/supply-record')
  supplyRecord(@Param("productId") productId: number, @Query() options: any) {
    // TODO:校验productId
    return this.supplyRecordService.retrieve({
      productId,
      ...options
    })
  }

}