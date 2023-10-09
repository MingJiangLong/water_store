import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";

@Controller('product')
@ApiTags('product')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  deleteProduct() {

  }
  updateProductStock() {

  }


}