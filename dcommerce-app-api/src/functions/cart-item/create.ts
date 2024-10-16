import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { CartItemService } from './cart-item.service';
import connectToDb from 'src/db/mongodb.service';
import { CartItemRepository } from 'src/shared/repositories/cart-item/cart-item-repository';
import { CreateCartItemDto } from 'src/shared/dto/cart-item/create-cart-item.dto';
import { ProxyEventWithAuthorizerData } from 'src/shared/types/LambdaEvents';
import { HttpError } from 'src/shared/types/HttpError';
import { ProductService } from '../product/product.service';
import { ProductRepository } from 'src/shared/repositories/product/product-repository';

const cartItemRepository = new CartItemRepository();
const cartItemService = new CartItemService(cartItemRepository);
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

exports.handler = async (
  event: ProxyEventWithAuthorizerData<unknown, unknown>,
) => {
  console.log('event', event);
  await connectToDb();
  try {
    const domainId = event.headers['x-domain'];
    const dto: CreateCartItemDto = JSON.parse(event.body);
    dto.userId = event.requestContext.authorizer.userId;

    // productId validation
    const product = await productService.getProductById(
      dto.productId,
      domainId,
    );
    if (!product) {
      throw new HttpError(
        400,
        'Invalid product. Product does not belong to the domain',
      );
    }

    // product quantity validation
    if (product.quantity < dto.quantity) {
      throw new HttpError(400, 'Quantity exceeds the availalbe quantity');
    }

    const cartItem = await cartItemService.createCartItem(dto);

    return new ResponseDto(201, cartItem, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(
      error.statusCode ?? 500,
      error.message,
      HEADERS,
      true,
    );
  }
};
