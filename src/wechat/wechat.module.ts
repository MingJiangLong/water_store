import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { WechatController } from "./wechat.controller";
import { WechatService } from "./wechat.service";

@Module({
  imports: [SharedModule],
  controllers: [WechatController],
  providers: [WechatService],
  exports: []
})
export class WechatModule { }