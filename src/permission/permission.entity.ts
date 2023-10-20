import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { EntityModel } from "../common/EntityModel";

@Table({
  tableName: "permission"
})
export class Permission extends EntityModel<Permission>{

  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  code: string

  @ForeignKey(() => Permission)
  @Column({
    field: 'parent_id',
    type: DataType.INTEGER
  })
  parentId: number

  @BelongsTo(() => Permission, {
    onDelete: 'CASCADE' // 设置级联删除
  })
  permission: Permission


}