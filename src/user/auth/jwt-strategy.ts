import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'jwtPrivateKey',
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        //TODO: 换成redis
        const user = await this.usersService.findUserByAccount(payload.account);
        if (!user) return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        return done(null, user, payload.iat);
    }
}
