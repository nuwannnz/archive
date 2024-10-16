import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryRepository } from '../../shared/repositories/product-category/product-category-repository';
import connectToDb from 'src/db/mongodb.service';

const productCategoryRepository = new ProductCategoryRepository();
const productCategoryService = new ProductCategoryService(
  productCategoryRepository,
);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;
    const productCategory = await productCategoryService.deleteProductCategory(
      id,
    );
    return new ResponseDto(200, productCategory, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
