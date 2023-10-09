import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductStatus } from "src/shared/enum/ProductStatus";
import { Repository } from "sequelize-typescript";

@Injectable()
export class ProductService {

  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const isProductExistAndAble = !!(await this.findAbleProductByName(createProductDto.productName));
      console.log("--------------");
      
      if (isProductExistAndAble) throw new HttpException('商品名已存在!', HttpStatus.CONFLICT);
      const product = new Product();
      Object.keys(createProductDto).forEach(key => {
        product[key] = createProductDto[key]
      })

      product.productName = createProductDto.productName;
      product.productPrice = createProductDto.productPrice;
    
      console.log(product);
      
      return product.save()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /** 根据名字查找可用商品 */
  findAbleProductByName(productName: string) {
    return this.productRepository.findOne({
      where: {
        productName,
        productStatus: ProductStatus.ABLE
      }
    })
  }
}