import { IsNotEmpty } from "class-validator";

export class CreateBackendUserDto {
  @IsNotEmpty({ message: "账号不能为空" })
  account: string
}