import { IsNotEmpty } from "class-validator";
import { CreatePermissionDto } from "./createPermission.dto";

export class UpdatePermissionDto extends CreatePermissionDto {
  @IsNotEmpty({ message: "权限id不能为空" })
  id: number
  constructor(id: number) {
    super();
    this.id = id;
  }
}