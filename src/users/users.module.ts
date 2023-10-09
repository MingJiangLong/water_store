import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from './../database/database.module';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, ...usersProviders, JwtStrategy],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
