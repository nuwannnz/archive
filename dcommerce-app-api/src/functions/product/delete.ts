import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductRepository } from 'src/shared/repositories/product/product-repository';
import { ProductService } from './product.service';
import connectToDb from 'src/db/mongodb.service';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;
    const productCategory = await productService.deleteProduct(id);
    return new ResponseDto(200, productCategory, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
