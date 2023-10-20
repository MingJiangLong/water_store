import { Sequelize } from 'sequelize-typescript';
import { Product } from './../products/product.entity';
import { ConfigService } from './../shared/config/config.service';
import { SupplyRecord } from './../supply-record/supply-record.entity';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';
import { Permission } from '../permission/permission.entity';
import { RolePermission } from '../relation/r-role-permission.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([
                User, Role, Permission, RolePermission,
                Product, SupplyRecord]);
            // await sequelize.sync({ force: true });
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
