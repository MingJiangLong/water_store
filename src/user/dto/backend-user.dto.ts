import { ApiProperty } from "@nestjs/swagger"
import { Gender } from "../../shared/enum/Gender"

export class BackendUserDto {

  @ApiProperty()
  account: string

  constructor(backendUserDto: BackendUserDto) {
    this.account = backendUserDto.account;
  }
}