import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ProductCategoryRepository } from 'src/shared/repositories/product-category/product-category-repository';
import { ProductCategoryService } from './product-category.service';
import { UpdateProductCategoryDto } from '../../shared/dto/product-category/update-product-category.dto';
import connectToDb from 'src/db/mongodb.service';
import { json } from 'stream/consumers';

const productCategoryRepository = new ProductCategoryRepository();
const productCategoryService = new ProductCategoryService(
  productCategoryRepository,
);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;
    const dto: UpdateProductCategoryDto = JSON.parse(event.body);
    dto.id = id;
    const productCategory = await productCategoryService.updateProductCategory(
      dto,
    );
    return new ResponseDto(200, productCategory, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
