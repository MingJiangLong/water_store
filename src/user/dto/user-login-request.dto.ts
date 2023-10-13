import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AdminLoginRequestDto {
    @ApiProperty()
    @IsEmail()
    readonly account: string;

    @ApiProperty()
    @IsString()
    readonly password: string;
}
