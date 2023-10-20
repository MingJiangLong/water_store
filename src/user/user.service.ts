import { Injectable, Inject, HttpException, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { AdminLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '../shared/config/config.service';
import { Repository, Sequelize } from 'sequelize-typescript';
import { BackendUserLoginDto } from './dto/login.dto';
import { BackendUserLoginResponseDto } from './dto/backend-user-login-response.dto';
import { CreateBackendUserDto } from './dto/create-backend-user.dto';
import SuccessResponse from '../common/SuccessResponse';

@Injectable()
export class UserService {
    private readonly jwtPrivateKey: string;
    private readonly userRepository: Repository<User>
    constructor(
        @Inject('SEQUELIZE')
        private readonly sequelize: Sequelize,
        private readonly configService: ConfigService,
    ) {
        this.userRepository = <Repository<User>>this.sequelize.models.User;
        this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
    }

    /**
     * 有管理员或者微信用户登录
     * @param adminLoginRequestDto 
     * @returns 
     */
    async login(adminLoginRequestDto: AdminLoginRequestDto) {
        return console.log("hello")
    }

    async backendUserLogin(backendUserLoginDto: BackendUserLoginDto) {
        const account = backendUserLoginDto.account;
        const password = backendUserLoginDto.password;
        const user = await this.findUserByAccount(account);
        if (!user) throw new NotFoundException('用户名或者密码错误')

        const isPasswordCorrect = compare(password, user.password);
        if (!isPasswordCorrect) throw new NotFoundException('用户名或者密码错误')

        const token = this.sign(user.account);
        return new BackendUserLoginResponseDto(user, token);
    }

    async createBackendUser(createBackendUserDto: CreateBackendUserDto) {
        const isBackendUserExist = await this.userRepository.findOne({
            where: {
                account: createBackendUserDto.account
            }
        })

        if (isBackendUserExist) throw new ConflictException("账号已存在")

        const user = new User()
        user.account = createBackendUserDto.account;
        user.password = await this.signPassword('123456');
        await user.save()
        return new SuccessResponse(createBackendUserDto)

    }

    findUserPermissionById(id: number) {

    }

    findUserByAccount(account: string) {
        return this.userRepository.findOne({
            where: {
                account
            }
        })
    }

    /**
     * TODO:记录请求来源origin
     * @param account 
     * @returns 
     */
    sign(account: string) {
        const payload = {
            account,
            origin: ''
        };
        return sign(payload, this.jwtPrivateKey, {});
    }

    async signPassword(password: string) {
        const salt = await genSalt(10)
        return hash(password, salt);
    }

}
