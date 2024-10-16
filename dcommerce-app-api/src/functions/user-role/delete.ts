import connectToDb from 'src/db/mongodb.service';
import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { UserRoleRepository } from 'src/shared/repositories/user-role/user-role-repository';
import { UserRoleService } from './user-role.service';

const userRoleRepository = new UserRoleRepository();
const userRoleService = new UserRoleService(userRoleRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;
    const userRoles = await userRoleService.deleteUserRole(id);
    return new ResponseDto(200, userRoles, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
