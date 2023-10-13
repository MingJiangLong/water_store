import { Post, Controller, Body, HttpCode, UseGuards } from "@nestjs/common";
import { BackendUserService } from "./backend-user.service";
import { BackendUserLoginDto } from "./dto/login.dto";
import { CreateBackendUserDto } from "./dto/create-backend-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { BackendUserAuthService } from "../backend-auth/backend-user-auth.service";


@Controller('backend-user')
export class BackendUserController {
  constructor(
    private readonly backendUserService: BackendUserService,
    private readonly backendUserAuthService: BackendUserAuthService,
  ) { }

  @Post('login')
  login(@Body() backendUserLoginDto: BackendUserLoginDto) {
    return this.backendUserService.login(backendUserLoginDto)
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createBackendUserDto: CreateBackendUserDto) {
    return this.backendUserService.create(createBackendUserDto)
  }
}