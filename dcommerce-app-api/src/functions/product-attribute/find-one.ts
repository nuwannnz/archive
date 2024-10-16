import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductAttributeService } from './product-attribute.service';
import connectToDb from 'src/db/mongodb.service';
import { ProductAttributeRepository } from 'src/shared/repositories/product-attribute/product-attribute-repository';
import { ProxyEventWithAuthorizerData } from 'src/shared/types/LambdaEvents';

const productAttributeRepository = new ProductAttributeRepository();
const productAttributeService = new ProductAttributeService(
  productAttributeRepository,
);

exports.handler = async (
  event: ProxyEventWithAuthorizerData<{ id: string }, unknown>,
) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { userDomain } = event.requestContext.authorizer;
    const { id } = event.pathParameters;

    const productAttribute =
      await productAttributeService.getProductAttributeById(id, userDomain);

    return new ResponseDto(200, productAttribute, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
