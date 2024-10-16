import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductRepository } from 'src/shared/repositories/product/product-repository';
import { ProductService } from './product.service';
import { UpdateProductDto } from 'src/shared/dto/product/update-product.dto';
import connectToDb from 'src/db/mongodb.service';
import sharp from 'sharp';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;
    const dto: UpdateProductDto = JSON.parse(event.body);
    dto.id = id;
    dto.domainId = event.requestContext.authorizer.userDomain;
    const productCategory = await productService.updateProduct(dto, sharp);
    return new ResponseDto(200, productCategory, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
