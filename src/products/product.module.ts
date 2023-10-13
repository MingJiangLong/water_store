import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { DatabaseModule } from "../database/database.module";
import { Product } from "./product.entity";
import { SupplyRecordModule } from "../supply-record/supply-record.module";
@Module({
  imports: [DatabaseModule, SupplyRecordModule],
  providers: [
    ProductService,
    {
      provide: "ProductRepository",
      useValue: Product
    },
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
