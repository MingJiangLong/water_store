import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateRoleDto {

  @IsNotEmpty({ message: "角色名称不能为空" })
  name: string

  @IsOptional()
  code: string

}