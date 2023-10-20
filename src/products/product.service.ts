import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductStatus } from "../shared/enum/ProductStatus";
import { Repository } from "sequelize-typescript";
import { RetrieveProductDto } from "./dto/retrieve-product.dto";
import { SupplyRecordService } from "../supply-record/supply-record.service";
import SuccessResponse from "../common/SuccessResponse";

@Injectable()
export class ProductService {

  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: Repository<Product>,
    @Inject(SupplyRecordService)
    private readonly supplyRecordService: SupplyRecordService
  ) { }

  async create(createProductDto: CreateProductDto) {
    const isProductExistAndAble = !!(await this.findAbleProductByName(createProductDto.productName));

    if (isProductExistAndAble) throw new ConflictException('商品名已存在!');
    const product = new Product();

    
    Object.keys(createProductDto).forEach(key => {
      product[key] = createProductDto[key]
    })

    product.productName = createProductDto.productName;
    product.productPrice = createProductDto.productPrice;
    await product.save()

    return new SuccessResponse(product, "创建商品成功")

  }

  async delete(productId: number) {
    const existProduct = await this.findAbleProductById(productId);
    if (!existProduct) throw new ConflictException("商品不存在!");

    const isProductDisable = existProduct.productStatus === ProductStatus.DISABLE;
    if (existProduct && isProductDisable) throw new ConflictException("商品不存在!");

    // TODO:查询是否有关联订单,直接删除,否则只是逻辑删除
    existProduct.productStatus = ProductStatus.DISABLE;
    return existProduct.save()
  }

  /** 补货 */
  async supplyProduct(productId: number, supplyNumber: number) {
    const product = await this.productRepository.findByPk(productId);
    const notFindProduct = !product;
    if (notFindProduct) throw new ConflictException("该商品不存在!");
    if (product.productStatus === ProductStatus.DISABLE) throw new ConflictException("不能补货已失效商品!");
    product.productStock += supplyNumber;
    await product.save()
    this.supplyRecordService.addRecord({
      productId,
      supplyNumber
    })
  }
  /** 条件查找 */
  findAbleProductBy(options?: RetrieveProductDto) {
    return this.productRepository.findAndCountAll({
      where: {
        ...options,
        productStatus: ProductStatus.ABLE
      }
    })
  }

  /** 根据id查找商品 */
  findAbleProductById(productId: number) {
    return this.productRepository.findByPk(productId)
  }

  /** 根据名字查找可用商品 */
  findAbleProductByName(productName: string) {
    return this.productRepository.findOne({
      where: {
        productName,
        productStatus: ProductStatus.ABLE,
      }
    })
  }


}
