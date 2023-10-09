import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
} from 'sequelize-typescript';
import { ProductStatus } from '../shared/enum/ProductStatus';

@Table({
  tableName: 'product',
})
export class Product extends Model<Product>  {
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    field: 'product_id',
  })
  productId: number;

  @Column({
    type: DataType.STRING,
    field: 'product_name'
  })
  productName: string;

  @Column({
    type: DataType.STRING,
    field: 'product_pic'
  })
  productPic: string;

  @Column({
    type: DataType.DECIMAL,
    field: 'product_weight'
  })
  productWeight: number;

  @Column({
    type: DataType.DECIMAL,
    field: 'product_size'
  })
  productSize: number;

  @Column({
    type: DataType.DECIMAL,
    field: 'product_price'
  })
  productPrice: number;

  @Column({
    type: DataType.INTEGER,
    field: 'product_stock',
    defaultValue: 0
  })
  productStock: number;

  @Column({
    type: DataType.ENUM(ProductStatus.ABLE, ProductStatus.DISABLE),
    field: 'product_status',
    defaultValue: ProductStatus.ABLE
  })
  productStatus: ProductStatus;



  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'update_at',
    type: DataType.DATE,
  })
  updateAt: Date;
}
