import { AdminLoginRequestDto } from './dto/user-login-request.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    Delete,
    Req,
    UseGuards,
    Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('login')
    @HttpCode(200)
    @ApiOkResponse({ type: UserLoginResponseDto })
    login(
        @Body() userLoginRequestDto: AdminLoginRequestDto,
    ) {
        this.userService.login(userLoginRequestDto);
    }

    // @Get()
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: [UserDto] })
    // findAll(): Promise<UserDto[]> {
    //     return this.usersService.findAll();
    // }

    // @Get('me')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: UserDto })
    // async getUser(@Req() request): Promise<UserDto> {
    //     return this.usersService.getUser(request.user.id);
    // }

    // @Put('me')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: UserDto })
    // update(
    //     @Body() updateUserDto: UpdateUserDto,
    //     @Req() request,
    // ): Promise<UserDto> {
    //     return this.usersService.update(request.user.id, updateUserDto);
    // }

    // @Delete('me')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: UserDto })
    // delete(@Req() request): Promise<UserDto> {
    //     return this.usersService.delete(request.user.id);
    // }
}
