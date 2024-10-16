import { CreateUserDto } from 'src/shared/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/shared/dto/user/update-user.dto';
import { UserRepository } from 'src/shared/repositories/user/user-repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  createUser(crateUserDto: CreateUserDto) {
    return this.userRepository.create(crateUserDto);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.userRepository.update(updateUserDto);
  }

  getAllUsers(limit: number, pageNumber: number) {
    return this.userRepository.findAll(limit, pageNumber);
  }

  getUserById(id: string) {
    return this.userRepository.findOne(id);
  }

  deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
