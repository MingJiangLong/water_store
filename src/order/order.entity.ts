import { AutoIncrement, Column, CreatedAt, ForeignKey, Model, PrimaryKey, UpdatedAt } from "sequelize-typescript";
import { User } from "src/users/user.entity";

export class Order extends Model<Order>{


  @PrimaryKey
  @AutoIncrement
  @Column({
    field: "order_id"
  })
  orderId: number

  @ForeignKey(() => User)
  @Column({
    field: 'user_id'
  })
  userId: number
  
  @Column
  bill: number

  @CreatedAt
  @Column({
    field: "created_at"
  })
  createdAt?: Date

  @UpdatedAt
  @Column({
    field: "update_at"
  })
  updatedAt?: Date;

}