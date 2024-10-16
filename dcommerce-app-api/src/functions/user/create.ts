import connectToDb from 'src/db/mongodb.service';
import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { CreateUserDto } from 'src/shared/dto/user/create-user.dto';
import { UserRepository } from 'src/shared/repositories/user/user-repository';
import { UserService } from './user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const dto: CreateUserDto = JSON.parse(event.body);
    const user = await userService.createUser(dto);

    return new ResponseDto(200, user, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
