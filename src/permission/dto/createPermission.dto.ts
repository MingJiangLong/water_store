import { Expose } from "class-transformer"
import { IsNotEmpty, IsOptional } from "class-validator"

export class CreatePermissionDto {
  @Expose()
  @IsNotEmpty({ message: "权限名称不能为空" })
  name: string

  @Expose()
  @IsOptional()
  parentId: number

  @Expose()
  @IsOptional()
  code: string

}