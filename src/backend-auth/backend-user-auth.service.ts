import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BackendUserService } from '../backend-user/backend-user.service';

@Injectable()
export class BackendUserAuthService extends PassportStrategy(Strategy) {
  constructor(
    private readonly backendUserService: BackendUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwtPrivateKey',
    });
  }

  async validate(payload: {
    account: string
    iat: string
  }, done: VerifiedCallback) {
    const user = await this.backendUserService.findUserByAccount(payload.account);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    // TODO:判断权限
    return done(null, user, payload.iat);
  }
}
