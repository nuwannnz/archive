import connectToDb from 'src/db/mongodb.service';
import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { UserRepository } from 'src/shared/repositories/user/user-repository';
import { UserService } from './user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { limit, pageNumber } = event.queryStringParameters;
    const users = await userService.getAllUsers(limit, pageNumber);
    return new ResponseDto(200, users, HEADERS);
  } catch (error) {
    return new ResponseDto(500, error.message, HEADERS);
  }
};
