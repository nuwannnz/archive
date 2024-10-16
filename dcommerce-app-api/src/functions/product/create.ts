import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductRepository } from '../../shared/repositories/product/product-repository';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/shared/dto/product/create-product.dto';
import connectToDb from 'src/db/mongodb.service';
import sharp from 'sharp';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const dto: CreateProductDto = JSON.parse(event.body);

    dto.domainId = event.requestContext.authorizer.userDomain;
    const product = await productService.createProduct(dto, sharp);

    return new ResponseDto(200, product, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
