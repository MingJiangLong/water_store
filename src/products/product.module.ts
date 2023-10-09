import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { DatabaseModule } from "src/database/database.module";
import { Product } from "./product.entity";
@Module({
  imports: [],
  providers: [
    ProductService,
    {
      provide: 'ProductRepository',
      useValue: typeof Product
    }
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
