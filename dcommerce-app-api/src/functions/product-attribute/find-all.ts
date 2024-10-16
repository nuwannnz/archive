import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductAttributeService } from './product-attribute.service';
import connectToDb from 'src/db/mongodb.service';
import { ProductAttributeRepository } from 'src/shared/repositories/product-attribute/product-attribute-repository';
import { ProxyEventWithAuthorizerData } from 'src/shared/types/LambdaEvents';
import { PaginatedQueryStringParameters } from 'src/shared/types/Request';

const productAttributeRepository = new ProductAttributeRepository();
const productAttributeService = new ProductAttributeService(
  productAttributeRepository,
);

exports.handler = async (
  event: ProxyEventWithAuthorizerData<unknown, PaginatedQueryStringParameters>,
) => {
  console.log('event', event);
  await connectToDb();

  try {
    const { userDomain } = event.requestContext.authorizer;
    const { limit, pageNumber } = event.queryStringParameters;

    const productAttributes =
      await productAttributeService.getAllProductAttributes(
        limit,
        pageNumber,
        userDomain,
      );

    return new ResponseDto(200, productAttributes, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
