import { Types } from 'mongoose';
import { UpdateUserRoleDto } from 'src/shared/dto/user-role/update-user-role-dto';
import { UserRoleModal } from 'src/shared/modals/user-role.modal';
import { CreateUserRoleDto } from '../../dto/user-role/create-user-role.dto';

export class UserRoleRepository {
  async create(userRole: CreateUserRoleDto) {
    const userRoleObj = await UserRoleModal.create({
      name: userRole.name,
      permissions: userRole.permissions,
    });
    return userRoleObj.toJSON();
  }

  async update(userRole: UpdateUserRoleDto) {
    const updatedUserRole = await UserRoleModal.findOneAndUpdate(
      { _id: new Types.ObjectId(userRole.id), isActive: true },
      {
        name: userRole.name,
        permissions: userRole.permissions,
      },
      {
        new: true,
      },
    );
    return updatedUserRole.toJSON();
  }

  async findAll(limit: number, pageNumber: number) {
    const userRoles = await UserRoleModal.find()
      .where({ isActive: true })
      .limit(limit)
      .skip((pageNumber - 1) * limit)
      .exec();

    const totalCount = await UserRoleModal.count({ isActive: true });
    return {
      data: userRoles,
      totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: string) {
    const userRole = await UserRoleModal.findOne({
      _id: new Types.ObjectId(id),
      isActive: true,
    });
    return userRole;
  }

  async delete(id: string) {
    await UserRoleModal.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { isActive: false },
    );
  }
}
