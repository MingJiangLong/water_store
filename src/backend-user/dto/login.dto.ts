import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class BackendUserLoginDto {

  @ApiProperty({ description: "账号" })
  @IsNotEmpty({ message: "账号不能为空" })
  account: string

  @ApiProperty({ description: "密码" })
  @IsNotEmpty({ message: "密码不能为空" })
  password: string
}