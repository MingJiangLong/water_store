import { Module, forwardRef } from "@nestjs/common";
import { BackendUserAuthService } from "./backend-user-auth.service";
import { BackendUserModule } from "../backend-user/backend-user.module";

@Module({
  imports: [forwardRef(() => BackendUserModule)],
  providers: [BackendUserAuthService],
  exports: [BackendUserAuthService]
})
export class BackendUserAuthModule { }