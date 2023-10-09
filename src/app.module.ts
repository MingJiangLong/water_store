import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { ProductModule } from './products/product.module';

@Module({
    imports: [ProductModule, SharedModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
