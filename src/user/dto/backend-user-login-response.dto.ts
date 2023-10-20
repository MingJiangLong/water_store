import { ApiProperty } from "@nestjs/swagger";
import { BackendUserDto } from "./backend-user.dto";

export class BackendUserLoginResponseDto extends BackendUserDto {
  @ApiProperty()
  token: string

  constructor(backendUser: BackendUserDto, token?: string) {
    super(backendUser);
    this.token = token;
  }
}