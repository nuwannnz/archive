import connectToDb from 'src/db/mongodb.service';
import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductRepository } from 'src/shared/repositories/product/product-repository';
import { ProductService } from './product.service';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const domainId = event.headers['x-domain'];
    const { id } = event.pathParameters;
    const productCategory = await productService.getProductById(id, domainId);
    return new ResponseDto(200, productCategory, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
