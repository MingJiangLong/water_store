import { Injectable } from '@nestjs/common';
import config from '../../../config';

@Injectable()
export class ConfigService {
    get sequelizeOrmConfig() {
        return config.database;
    }

    get jwtConfig() {
        return { privateKey: config.jwtPrivateKey };
    }

    get WECHAT_APPID() {
        return config.wechatAppId
    }

    get WECHAT_SECRET() {
        return config.wechatSecret;
    }
}
