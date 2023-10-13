import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "sequelize-typescript";
import { BackendUser } from "./backend-user.entity";
import { BackendUserLoginDto } from "./dto/login.dto";
import { compare, genSalt, hash } from "bcrypt";
import { BackendUserLoginResponseDto } from "./dto/backend-user-login-response.dto";
import { sign } from "jsonwebtoken";
import { ConfigService } from "../shared/config/config.service";
import { CreateBackendUserDto } from "./dto/create-backend-user.dto";

@Injectable()
export class BackendUserService {

  private readonly jwtPrivateKey: string;
  constructor(
    @Inject('BackendUserRepository')
    private readonly backendUserRepository: Repository<BackendUser>,
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey
  }

  /**
   * TODO:权限校验
   * @param createBackendUserDto 
   */
  async create(createBackendUserDto: CreateBackendUserDto) {
    const user = await this.findUserByAccount(createBackendUserDto.account);
    if (user) throw new ConflictException('账号已被使用');
    const salt = await genSalt(10);

    const signedPassword = await hash(createBackendUserDto.password, salt);
    const backendUser = new BackendUser();
    backendUser.account = createBackendUserDto.account;
    backendUser.password = signedPassword;
    await backendUser.save();

  }

  /**
   * 判断是否重复登录
   * @param backendUserLoginDto 
   * @returns 
   */
  async login(backendUserLoginDto: BackendUserLoginDto) {
    const account = backendUserLoginDto.account;
    const password = backendUserLoginDto.password;
    const user = await this.findUserByAccount(account);
    if (!user) throw new NotFoundException('用户名或者密码错误')
    const isPasswordCorrect = compare(password, user.password);
    if (!isPasswordCorrect) throw new NotFoundException('用户名或者密码错误')
    const token = this.sign(user.account);
    return new BackendUserLoginResponseDto(user, token);
  }
  sign(account: string) {
    const payload = {
      account,
    };
    return sign(payload, this.jwtPrivateKey, {});
  }
  findUserByAccount(account: string) {
    return this.backendUserRepository.findOne({
      where: {
        account
      }
    })
  }
}