import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { BackendUserService } from "./backend-user.service";
import { BackendUser } from "./backend-user.entity";
import { BackendUserController } from "./backend-user.controller";
import { SharedModule } from "../shared/shared.module";
import { BackendUserAuthModule } from "../backend-auth/backend-user-auth.module";

@Module({
  imports: [DatabaseModule, BackendUserAuthModule, SharedModule,],
  providers: [
    BackendUserService,
    {
      provide: "BackendUserRepository",
      useValue: BackendUser
    }],
  controllers: [BackendUserController],
  exports: [BackendUserService]
})
export class BackendUserModule { }