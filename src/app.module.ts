import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './products/product.module';
import { UsersModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
@Module({
    imports: [
        UsersModule,
        RoleModule,
        PermissionModule,
        ProductModule, SharedModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
