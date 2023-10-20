import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService]
})
export class PermissionModule { }