import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Post } from './../posts/post.entity';
import { Product } from './../products/product.entity';
import { ConfigService } from './../shared/config/config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([Product]);
            await sequelize.sync({ force: true });
            return sequelize;
        },
        inject: [ConfigService],
    },
];
