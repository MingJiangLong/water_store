import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { EntityModel } from "../common/EntityModel";
import { Role } from "../role/role.entity";
import { Permission } from "../permission/permission.entity";

@Table({
  tableName: "r_permission_role"
})
export class RolePermission extends EntityModel<RolePermission>{

  @ForeignKey(() => Role)
  @Column({
    field: 'role_id',
    type: DataType.INTEGER
  })
  roleId: number

  @ForeignKey(() => Permission)
  @Column({
    field: 'permission_id',
    type: DataType.INTEGER
  })
  permissionId: number

}