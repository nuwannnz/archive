import connectToDb from 'src/db/mongodb.service';
import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { UpdateUserRoleDto } from 'src/shared/dto/user-role/update-user-role-dto';
import { UserRoleRepository } from 'src/shared/repositories/user-role/user-role-repository';
import { UserRoleService } from './user-role.service';

const userRoleRepository = new UserRoleRepository();
const userRoleService = new UserRoleService(userRoleRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;
    const dto: UpdateUserRoleDto = JSON.parse(event.body);
    dto.id = id;
    const userRoles = await userRoleService.updateUserRole(dto);
    return new ResponseDto(200, userRoles, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
