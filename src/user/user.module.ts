import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';
import { JwtStrategy } from './auth/jwt-strategy';
import { DatabaseModule } from '../database/database.module';
import { BackendUserController } from './backend-user.controller';

@Module({
    imports: [DatabaseModule],
    providers: [
        UserService,
        ...usersProviders, JwtStrategy],
    controllers: [UserController, BackendUserController],
    exports: [UserService],
})
export class UsersModule { }
