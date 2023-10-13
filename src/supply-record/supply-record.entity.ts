import {
  AutoIncrement, BelongsTo, Column,
  CreatedAt, DataType, DefaultScope,
  ForeignKey, Model, Scopes, Table
} from "sequelize-typescript";
import { Product } from "../products/product.entity";
@Table({
  tableName: "supply_record"
})
export class SupplyRecord extends Model<SupplyRecord> {

  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    field: 'record_id'
  })
  recordId: number;

  @Column({
    type: DataType.INTEGER,
    field: 'supply_number'
  })
  supplyNumber: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  createdAt: Date;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    field: 'product_id',
  })
  productId: number

  @Column({
    field: 'creator',
    comment: "预留字段"
  })
  creator: string

  @BelongsTo(() => Product)
  product: Product

  static defaultScope = () => ({
    include: [Product],
  });
 
}