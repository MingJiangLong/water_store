import { Injectable, Inject } from "@nestjs/common";
import { CreateSupplyRecordDto } from "./dto/create-record.dto";
import { Repository } from "sequelize-typescript";
import { SupplyRecord } from "./supply-record.entity";
import { RetrieveSupplyRecordDto } from "./dto/retrieve-supply-record.dto";
import { Product } from "../products/product.entity";

@Injectable()
export class SupplyRecordService {
  constructor(
    @Inject('SupplyRecordRepository')
    private readonly supplyRecordRepository: Repository<SupplyRecord>
  ) { }

  addRecord(createSupplyRecordDto: CreateSupplyRecordDto) {
    const supplyRecord = new SupplyRecord()
    supplyRecord.productId = createSupplyRecordDto.productId;
    supplyRecord.supplyNumber = createSupplyRecordDto.supplyNumber;
    return supplyRecord.save()
  }

  /**
   * 查询补货记录
   * @param retrieveSupplyRecordDto 
   * @returns 
   */
  retrieve(retrieveSupplyRecordDto: RetrieveSupplyRecordDto) {
    return this.supplyRecordRepository.findAndCountAll({
      where: {
        product_id: retrieveSupplyRecordDto.productId
      },
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ],
      order: [
        ["created_at", 'DESC']
      ]
    })
  }
}