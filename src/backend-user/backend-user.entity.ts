import { Column, DataType, Table, Unique } from "sequelize-typescript";
import { EntityModel } from "../common/EntityModel";
import { Gender } from "../shared/enum/Gender";

@Table({
  tableName: 'backend_user',
  comment: "管理端用户表"
})
export class BackendUser extends EntityModel<BackendUser> {

  @Column({
    type: DataType.STRING,
  })
  name: string

  @Column({
    type: DataType.ENUM(Gender.FEMALE, Gender.MALE)
  })
  gender: Gender

  @Column({
    type: DataType.DATEONLY
  })
  birthday: Date

  @Column
  address: string

  @Column
  phone: string

  @Column({
    field: 'id_card'
  })
  idCard: string

  @Unique
  @Column
  account: string

  @Column
  password: string
}