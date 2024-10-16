import { ProductCategoryRepository } from '../../shared/repositories/product-category/product-category-repository';
import { CreateProductCategoryDto } from '../../shared/dto/product-category/create-product-category.dto';
import { UpdateProductCategoryDto } from '../../shared/dto/product-category/update-product-category.dto';

export class ProductCategoryService {
  constructor(private productCategoryRepository: ProductCategoryRepository) {}

  createProductCategory(createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryRepository.create(createProductCategoryDto);
  }

  updateProductCategory(updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryRepository.update(updateProductCategoryDto);
  }

  getAllProductCategories(limit: number, pageNumber: number) {
    return this.productCategoryRepository.findAll(limit, pageNumber);
  }

  getProductCategoryById(id: string) {
    return this.productCategoryRepository.findOne(id);
  }

  deleteProductCategory(id: string) {
    return this.productCategoryRepository.delete(id);
  }
}
