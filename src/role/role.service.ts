import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Repository, Sequelize } from "sequelize-typescript";
import { Role } from "./role.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { GetRoleListDto } from "./dto/get-role-list.dto";

@Injectable()
export class RoleService {

  private roleRepository: Repository<Role>
  constructor(
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize
  ) {
    this.roleRepository = <Repository<Role>>this.sequelize.models.Role
  }

  async create(createRoleDto: CreateRoleDto) {

    const isExistRole = await this.roleRepository.findOne({
      where: {
        name: createRoleDto.name
      }
    })

    if (isExistRole) throw new ConflictException(`角色名${createRoleDto.name}已存在`)

    const role = new Role()
    role.name = createRoleDto.name;
    role.code = createRoleDto.code;
    return role.save();
  }

  async getRoleList(getRoleListDto: GetRoleListDto) {
    this.roleRepository.findAndCountAll(getRoleListDto)
  }
}