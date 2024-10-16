import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductAttributeService } from './product-attribute.service';
import connectToDb from 'src/db/mongodb.service';
import { ProductAttributeRepository } from 'src/shared/repositories/product-attribute/product-attribute-repository';
import { ProxyEventWithAuthorizerData } from 'src/shared/types/LambdaEvents';
import { CreateProductAttributeDto } from 'src/shared/dto/product-attribute/create-product-attribute.dto';

const productAttributeRepository = new ProductAttributeRepository();
const productAttributeService = new ProductAttributeService(
  productAttributeRepository,
);

exports.handler = async (
  event: ProxyEventWithAuthorizerData<unknown, unknown>,
) => {
  console.log('event', event);

  await connectToDb();

  try {
    const domainId = event.requestContext.authorizer.userDomain;
    const dto: CreateProductAttributeDto = JSON.parse(event.body);
    dto.domainId = domainId;

    const productAttribute =
      await productAttributeService.createProductAttribute(dto);

    return new ResponseDto(200, productAttribute, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
