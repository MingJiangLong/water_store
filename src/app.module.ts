import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './products/product.module';
import { BackendUserModule } from './backend-user/backend-user.module';
@Module({
    imports: [BackendUserModule, ProductModule, SharedModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
