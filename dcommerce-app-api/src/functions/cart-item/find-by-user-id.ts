import connectToDb from 'src/db/mongodb.service';
import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { CartItemRepository } from 'src/shared/repositories/cart-item/cart-item-repository';
import { ProxyEventWithAuthorizerData } from 'src/shared/types/LambdaEvents';
import { CartItemService } from './cart-item.service';

const cartItemRepository = new CartItemRepository();
const cartItemService = new CartItemService(cartItemRepository);

exports.handler = async (
  event: ProxyEventWithAuthorizerData<unknown, unknown>,
) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { userId } = event.requestContext.authorizer;
    const cartItems = await cartItemService.getCartItemsByUserId(userId);
    return new ResponseDto(200, cartItems, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
