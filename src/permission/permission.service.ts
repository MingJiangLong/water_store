import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository, Sequelize } from "sequelize-typescript";
import { Permission } from "./permission.entity";
import { CreatePermissionDto } from "./dto/createPermission.dto";
import { Role } from "../role/role.entity";
import { RolePermission } from "../relation/r-role-permission.entity";
import SuccessResponse from "../common/SuccessResponse";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { BatchCreatePermissionDto } from "./dto/batch-create-permission.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class PermissionService {

  private permissionRepository: Repository<Permission>
  private roleRepository: Repository<Role>
  private R_Permission_Role: Repository<RolePermission>
  constructor(
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize
  ) {
    this.permissionRepository = <Repository<Permission>>this.sequelize.models.Permission
    this.roleRepository = <Repository<Role>>this.sequelize.models.Role
    this.R_Permission_Role = <Repository<RolePermission>>this.sequelize.models.RolePermission
  }

  async add(createPermissionDto: CreatePermissionDto) {
    const isPermissionExist = await this.findPermissionByName(createPermissionDto.name);
    if (isPermissionExist) throw new ConflictException(`权限:${createPermissionDto.name}已存在`);

    const parentId = createPermissionDto.parentId;
    if (parentId) {
      const parentPermission = await this.findPermissionById(parentId);
      if (!!!parentPermission) throw new NotFoundException(`parentId:${parentId}不存在`)
    }

    const permission2 = plainToInstance(Permission, createPermissionDto, { excludeExtraneousValues: true })

    console.log(permission2);

    const permission = new Permission();
    console.log(permission);

    permission.name = createPermissionDto.name;
    permission.parentId = createPermissionDto.parentId;
    const result = await permission.save();
    return new SuccessResponse(result, '添加权限内容成功')
  }

  async batchAdd(batchCreatePermissionDto: BatchCreatePermissionDto) {
    const batchPromise = batchCreatePermissionDto.permissions.map(item => this.add(item))
    const result = (await Promise.all(batchPromise)).map(item => item.data);
    return new SuccessResponse(result, '创建成功')
  }

  async findAllPermission() {
    const result = await this.permissionRepository.findAll()
    return new SuccessResponse(result)
  }

  async updatePermission(updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findPermissionById(updatePermissionDto.id);
    if (!permission) throw new NotFoundException('权限不存在');

    const parentId = updatePermissionDto.parentId;
    if (parentId) {
      const parentPermission = await this.findPermissionById(parentId);
      if (!!!parentPermission) throw new NotFoundException(`parentId:${parentId}不存在`)
    }

    permission.name = updatePermissionDto.name;
    permission.parentId = updatePermissionDto.parentId;

    await permission.save();
    return new SuccessResponse(permission, '修改成功')
  }

  async delete(id: number) {
    const permission = await this.findPermissionById(id);
    if (!!!permission) throw new NotFoundException('权限内容不存在')
    await permission.destroy()
    return new SuccessResponse({}, "删除成功")

  }

  async findPermissionIncludeChildrenById(id: number): Promise<Permission[]> {
    const permission = await this.findPermissionById(id);
    const children = await this.findPermissionByParentId(id);

    const nextChildrenPromise = children.map(async (child) => await this.findPermissionIncludeChildrenById(child.id))
    let nextChildren = await Promise.all(nextChildrenPromise);
    let flattedNextChildren = nextChildren.reduce((count, current) => {
      return [
        ...count,
        ...current
      ]
    }, [])

    return [
      permission,
      ...flattedNextChildren
    ]
  }

  async findPermissionById(id: number) {
    return this.permissionRepository.findByPk(id)
  }

  async findPermissionByParentId(id: number) {
    return this.permissionRepository.findAll({
      where: {
        parent_id: id
      }
    })
  }

  async findPermissionByName(name: string) {
    return this.permissionRepository.findOne({
      where: {
        name
      }
    })
  }

  async findPermissionBy() {

  }

}