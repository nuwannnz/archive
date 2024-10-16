import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import connectToDb from 'src/db/mongodb.service';
import { ProxyEventWithAuthorizerData } from 'src/shared/types/LambdaEvents';
import { CreateReservedProductsDto } from '../../shared/dto/reserved-product/create-reserved-products.dto';
import { ReservedProductRepository } from '../../shared/repositories/reserved-product/reserved-product-repository';
import { ReservedProductService } from './reserved-product.service';
import { ProductVariantRepository } from 'src/shared/repositories/product-variant/product-variant-repository';

const reservedProductRepository = new ReservedProductRepository();
const productVariantRepository = new ProductVariantRepository();
const reservedProductService = new ReservedProductService(
  reservedProductRepository,
  productVariantRepository,
);

exports.handler = async (
  event: ProxyEventWithAuthorizerData<unknown, unknown>,
) => {
  console.log('event', event);
  await connectToDb();
  try {
    const userId = event.requestContext.authorizer.userId;
    const domainId = event.headers['x-domain'];
    const dto: CreateReservedProductsDto = JSON.parse(event.body);
    dto.userId = userId;
    const reservedProducts =
      await reservedProductService.createReservedProducts(domainId, dto);
    return new ResponseDto(201, reservedProducts, HEADERS);
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
