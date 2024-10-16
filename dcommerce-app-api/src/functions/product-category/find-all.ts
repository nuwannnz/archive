import connectToDb from 'src/db/mongodb.service';
import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductCategoryRepository } from 'src/shared/repositories/product-category/product-category-repository';
import { ProductCategoryService } from './product-category.service';

const productCategoryRepository = new ProductCategoryRepository();
const productCategoryService = new ProductCategoryService(
  productCategoryRepository,
);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { limit, pageNumber } = event.queryStringParameters;
    const productCategories =
      await productCategoryService.getAllProductCategories(limit, pageNumber);
    return new ResponseDto(200, productCategories, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
