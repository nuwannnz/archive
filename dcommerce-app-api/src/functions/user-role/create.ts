import { HEADERS } from 'src/shared/constants/headers';
import { CreateUserRoleDto } from 'src/shared/dto/user-role/create-user-role.dto';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { UserRoleRepository } from 'src/shared/repositories/user-role/user-role-repository';
import { UserRoleService } from './user-role.service';
import connectToDb from 'src/db/mongodb.service';

const userRoleRepository = new UserRoleRepository();
const userRoleService = new UserRoleService(userRoleRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const dto: CreateUserRoleDto = JSON.parse(event.body);
    const userRoles = await userRoleService.createUserRole(dto);

    return new ResponseDto(200, userRoles, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
