import { ApiProperty } from "@nestjs/swagger"
import { Gender } from "../../shared/enum/Gender"

export class BackendUserDto {

  @ApiProperty()
  name: string

  @ApiProperty()
  address: string

  @ApiProperty()
  gender: Gender

  @ApiProperty()
  birthday: Date


  @ApiProperty()
  phone: string

  @ApiProperty()
  account: string

  constructor(backendUserDto: BackendUserDto) {
    this.name = backendUserDto.name;
    this.address = backendUserDto.address;
    this.gender = backendUserDto.gender;
    this.birthday = backendUserDto.birthday;
    this.phone = backendUserDto.phone;
    this.account = backendUserDto.account;
  }
}