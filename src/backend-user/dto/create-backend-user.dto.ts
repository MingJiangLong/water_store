import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateBackendUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: "账号不能为空" })
  account: string

  @ApiProperty()
  @IsNotEmpty({
    message: "密码不能为空"
  })
  password: string
}