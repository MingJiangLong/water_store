import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { CreatePermissionDto } from "./dto/createPermission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { BatchCreatePermissionDto } from "./dto/batch-create-permission.dto";

@Controller('permission')
export class PermissionController {

  constructor(
    private readonly permissionService: PermissionService
  ) { }

  @Post('add')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.add(createPermissionDto)
  }

  @Get('list')
  findAllPermission() {
    return this.permissionService.findAllPermission()
  }

  @Post('update')
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.updatePermission(updatePermissionDto)
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.permissionService.delete(id)
  }

  @Post('/batch-add')
  batchAdd(@Body() batchCreatePermissionDto: BatchCreatePermissionDto) {
    return this.permissionService.batchAdd(batchCreatePermissionDto)
  }

}