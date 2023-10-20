import { IsArray } from "class-validator";
import { CreatePermissionDto } from "./createPermission.dto";

export class BatchCreatePermissionDto {
  @IsArray({ message: "批量添加数据必须为数组结构" })
  permissions: CreatePermissionDto[]
}