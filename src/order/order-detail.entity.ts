import { Column, DataType, ForeignKey } from "sequelize-typescript";
import { Order } from "./order.entity";
import { EntityModel } from "../common/EntityModel";

export class OrderDetail extends EntityModel<OrderDetail>{

  @ForeignKey(() => Order)
  @Column({
    field: "product_id"
  })
  productId: number

  @ForeignKey(() => Order)
  @Column({
    field: "order_id"
  })
  orderId: number

  @Column({
    type: DataType.DECIMAL
  })
  quantity: number

  @Column({
    type: DataType.DECIMAL
  })
  price: number

  @Column({
    field: "discount_code"
  })
  discountCode: string

  @Column({
    field: "discount_value",
    defaultValue: 0
  })
  discountValue: number

  @Column({
    type: DataType.ENUM("1", "2")
  })
  currency: string

}