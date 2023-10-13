import { Sequelize } from 'sequelize-typescript';
import { Product } from './../products/product.entity';
import { ConfigService } from './../shared/config/config.service';
import { SupplyRecord } from './../supply-record/supply-record.entity';
import { BackendUser } from '../backend-user/backend-user.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([BackendUser, Product, SupplyRecord]);
            // await sequelize.sync({ force: true });
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
