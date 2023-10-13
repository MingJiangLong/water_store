import { User } from './../user.entity';
import { Gender } from '../../shared/enum/Gender';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiProperty()
    readonly account: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly gender: Gender;

    @ApiProperty()
    readonly birthday: string;

    @ApiProperty()
    readonly userName: string;

    constructor(user: User) {
        this.userName = user.userName;
        this.email = user.email;
        this.gender = user.gender;
        this.birthday = user.birthday;
        this.account = user.account;
    }
}
