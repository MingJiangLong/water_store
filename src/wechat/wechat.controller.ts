import { Controller, Post } from "@nestjs/common";

@Controller('wechat')
export class WechatController {


  @Post('sign')
  getSignInfo() { }

  @Post('refresh-token')
  refreshToken() { }

  @Post("login")
  login() { }

  @Post("register")
  register() { }
}