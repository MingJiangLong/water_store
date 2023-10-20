import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'mysql' as Dialect,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'water_store',
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
    wechatAppId: "wxa68387a8cb36847f",
    wechatSecret: "9f58c2964e210c736f0ac9c2710575d9"
};
