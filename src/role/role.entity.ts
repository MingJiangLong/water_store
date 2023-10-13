import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'role'
})

export class Role extends Model<Role> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @Column({
    type: DataType.STRING,
    field: 'role_name'
  })
  roleName: string
}