import connectToDb from 'src/db/mongodb.service';
import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { UserRoleRepository } from 'src/shared/repositories/user-role/user-role-repository';
import { UserRoleService } from './user-role.service';
import { ProxyEventWithAuthorizerData } from 'src/shared/types/LambdaEvents';
import { OWNED_USER_ROLE_ID_LBL } from 'src/shared/constants/common';

const userRoleRepository = new UserRoleRepository();
const userRoleService = new UserRoleService(userRoleRepository);

exports.handler = async (
  event: ProxyEventWithAuthorizerData<{ id: string }, unknown>,
) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;

    const roleId =
      id === OWNED_USER_ROLE_ID_LBL
        ? event.requestContext.authorizer.userRole
        : id;

    const userRole = await userRoleService.getUserRoleById(roleId);
    return new ResponseDto(200, userRole, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
