import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
import { Repository } from 'sequelize-typescript';

@Injectable()
export class UserService {
    private readonly jwtPrivateKey: string;

    constructor(
        @Inject('UserRepository')
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {
        this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
    }

    // async findAll() {
    //     const users = await this.usersRepository.findAll<User>();
    //     return users.map(user => new UserDto(user));
    // }

    // async getUser(id: string) {
    //     const user = await this.usersRepository.findByPk<User>(id);
    //     if (!user) {
    //         throw new HttpException(
    //             'User with given id not found',
    //             HttpStatus.NOT_FOUND,
    //         );
    //     }
    //     return new UserDto(user);
    // }

    // async getUserByEmail(email: string) {
    //     return await this.usersRepository.findOne<User>({
    //         where: { email },
    //     });
    // }

    // async create(createUserDto: CreateUserDto) {
    //     try {
    //         const user = new User();
    //         user.email = createUserDto.email.trim().toLowerCase();
    //         user.gender = createUserDto.gender;
    //         user.birthday = createUserDto.birthday;

    //         const salt = await genSalt(10);
    //         user.password = await hash(createUserDto.password, salt);

    //         const userData = await user.save();

    //         // when registering then log user in automatically by returning a token
    //         const token = await this.signToken(userData);
    //         return new UserLoginResponseDto(userData, token);
    //     } catch (err) {
    //         if (err.original.constraint === 'user_email_key') {
    //             throw new HttpException(
    //                 `User with email '${err.errors[0].value}' already exists`,
    //                 HttpStatus.CONFLICT,
    //             );
    //         }

    //         throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async findUserByOpenId(openId: string) {
    //     return await this.usersRepository.findOne<User>({
    //         where: {
    //             openId
    //         }
    //     })
    // }

    /**
     * 有管理员或者微信用户登录
     * @param adminLoginRequestDto 
     * @returns 
     */
    async login(adminLoginRequestDto: AdminLoginRequestDto) {
        const account = adminLoginRequestDto.account;
        const password = adminLoginRequestDto.password;

        const user = await this.getAdminUserByAccount(account);
        if (!user) {
            throw new HttpException(
                '用户名或者密码错误',
                HttpStatus.BAD_REQUEST,
            );
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException(
                '用户名或者密码错误',
                HttpStatus.BAD_REQUEST,
            );
        }
        const token = await this.signToken(user);
        return new UserLoginResponseDto(user, token);
    }

    getAdminUserByAccount(account: string) {
        return this.userRepository.findOne({
            where: {
                account
            }
        })
    }

    // async update(id: string, updateUserDto: UpdateUserDto) {
    //     const user = await this.usersRepository.findByPk<User>(id);
    //     if (!user) {
    //         throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    //     }

    //     user.gender = updateUserDto.gender || user.gender;
    //     user.birthday = updateUserDto.birthday || user.birthday;

    //     try {
    //         const data = await user.save();
    //         return new UserDto(data);
    //     } catch (err) {
    //         throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async delete(id: string) {
    //     const user = await this.usersRepository.findByPk<User>(id);
    //     await user.destroy();
    //     return new UserDto(user);
    // }

    async signToken(user: User) {
        const payload: JwtPayload = {
            account: user.account,
        };

        return sign(payload, this.jwtPrivateKey, {});
    }
}
