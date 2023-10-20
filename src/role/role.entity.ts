import { Column, DataType, Table } from "sequelize-typescript";
import { EntityModel } from "../common/EntityModel";

@Table({
  tableName: "role"
})
export class Role extends EntityModel<Role>{

  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  code: string
}