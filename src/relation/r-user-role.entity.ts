import { Column, ForeignKey, Table } from "sequelize-typescript";
import { EntityModel } from "../common/EntityModel";
import { Role } from "./role.entity";
import { User } from "../user/user.entity";

@Table({
  tableName: "user_permission"
})
export class UserRole extends EntityModel<UserRole>{

  @ForeignKey(() => Role)
  @Column
  roleId: number

  @ForeignKey(() => User)
  @Column
  userId: number
}