import { Types } from 'mongoose';
import { UserModal } from 'src/shared/modals/user.modal';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';

export class UserRepository {
  async create(user: CreateUserDto) {
    const userObj = await UserModal.create({
      domainId: new Types.ObjectId(user.domainId),
      userRoleId: new Types.ObjectId(user.userRoleId),
      userSub: user.userSub,
    });
    return userObj.toJSON();
  }

  async update(user: UpdateUserDto) {
    const updatedUser = await UserModal.findOneAndUpdate(
      { _id: new Types.ObjectId(user.id), isActive: true },
      {
        domainId: new Types.ObjectId(user.domainId),
        userRoleId: new Types.ObjectId(user.userRoleId),
      },
      {
        new: true,
      },
    );
    return updatedUser.toJSON();
  }

  async findAll(limit: number, pageNumber: number) {
    const users = await UserModal.find()
      .where({ isActive: true })
      .limit(limit)
      .skip((pageNumber - 1) * limit)
      .exec();

    const totalCount = await UserModal.count({ isActive: true });
    return {
      data: users,
      totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: string) {
    const user = await UserModal.findOne({
      _id: new Types.ObjectId(id),
      isActive: true,
    });
    return user;
  }

  async delete(id: string) {
    await UserModal.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { isActive: false },
    );
  }
}
