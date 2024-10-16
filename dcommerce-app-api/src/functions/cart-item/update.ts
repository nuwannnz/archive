import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { CartItemService } from './cart-item.service';
import connectToDb from 'src/db/mongodb.service';
import { CartItemRepository } from 'src/shared/repositories/cart-item/cart-item-repository';
import { UpdateCartItemDto } from 'src/shared/dto/cart-item/update-cart-item.dto';
import { ProxyEventWithAuthorizerData } from 'src/shared/types/LambdaEvents';

const cartItemRepository = new CartItemRepository();
const cartItemService = new CartItemService(cartItemRepository);

interface PathParameters {
  id: string;
}

exports.handler = async (
  event: ProxyEventWithAuthorizerData<PathParameters, unknown>,
) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { userId } = event.requestContext.authorizer;
    const { id } = event.pathParameters;
    const parsedBody = JSON.parse(event.body);
    const dto: UpdateCartItemDto = { ...parsedBody, id, userId };
    const cartItem = await cartItemService.updateCartItem(dto);
    return new ResponseDto(200, cartItem, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
