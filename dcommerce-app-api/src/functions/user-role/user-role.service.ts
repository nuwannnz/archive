import { CreateUserRoleDto } from '../../shared/dto/user-role/create-user-role.dto';
import { UserRoleRepository } from '../../shared/repositories/user-role/user-role-repository';
import { UpdateUserRoleDto } from '../../shared/dto/user-role//update-user-role-dto';

export class UserRoleService {
  constructor(private userRoleRepository: UserRoleRepository) {}

  createUserRole(createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleRepository.create(createUserRoleDto);
  }

  updateUserRole(updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleRepository.update(updateUserRoleDto);
  }

  getAllUserRoles(limit: number, pageNumber: number) {
    return this.userRoleRepository.findAll(limit, pageNumber);
  }

  getUserRoleById(id: string) {
    return this.userRoleRepository.findOne(id);
  }

  deleteUserRole(id: string) {
    return this.userRoleRepository.delete(id);
  }
}
