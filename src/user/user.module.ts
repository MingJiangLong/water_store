import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
    imports: [],
    providers: [
        UserService,
        
        ...usersProviders, JwtStrategy],
    controllers: [UserController],
    exports: [UserService],
})
export class UsersModule { }
