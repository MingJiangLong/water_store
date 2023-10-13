import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, UpdatedAt } from "sequelize-typescript";

export class EntityModel<T> extends Model<T>{
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

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