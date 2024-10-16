import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductAttributeService } from './product-attribute.service';
import connectToDb from 'src/db/mongodb.service';
import { ProductAttributeRepository } from 'src/shared/repositories/product-attribute/product-attribute-repository';
import { UpdateProductAttributeDto } from 'src/shared/dto/product-attribute/update-product-attribute.dto';
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
    const body = JSON.parse(event.body);
    const dto: UpdateProductAttributeDto = {
      ...body,
      id,
      domainId: userDomain,
    };

    const productAttribute =
      await productAttributeService.updateProductAttribute(dto);

    return new ResponseDto(200, productAttribute, HEADERS);
  } catch (error) {
    return new ResponseDto(500, error.message, HEADERS);
  }
};
