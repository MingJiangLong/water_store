import { Post, Controller, Body, } from "@nestjs/common";
import { BackendUserLoginDto } from "./dto/login.dto";
import { UserService } from "./user.service";
import { CreateBackendUserDto } from "./dto/create-backend-user.dto";


@Controller('backend-user')
export class BackendUserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('login')
  login(@Body() backendUserLoginDto: BackendUserLoginDto) {
    return this.userService.backendUserLogin(backendUserLoginDto)
  }

  @Post('create')
  create(@Body() createBackendUserDto: CreateBackendUserDto) {
    return this.userService.createBackendUser(createBackendUserDto)
  }
}