import { Body, Controller, Post } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { RoleService } from "./role.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) { }

  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  update() {

  }


}