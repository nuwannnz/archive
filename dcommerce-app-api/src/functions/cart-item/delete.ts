import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { CartItemService } from './cart-item.service';
import connectToDb from 'src/db/mongodb.service';
import { CartItemRepository } from 'src/shared/repositories/cart-item/cart-item-repository';

const cartItemRepository = new CartItemRepository();
const cartItemService = new CartItemService(cartItemRepository);
exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;
    const cartItem = await cartItemService.deleteCartItem(id);
    return new ResponseDto(200, cartItem, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
