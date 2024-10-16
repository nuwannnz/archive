import { Types } from 'mongoose';
import { ProductCategoryModal } from 'src/shared/modals/product-category.modal';
import { CreateProductCategoryDto } from '../../dto/product-category/create-product-category.dto';
import { UpdateProductCategoryDto } from '../../dto/product-category/update-product-category.dto';

export class ProductCategoryRepository {
  async create(productCategory: CreateProductCategoryDto) {
    const productCategoryObj = await ProductCategoryModal.create({
      name: productCategory.name,
      domainId: new Types.ObjectId(productCategory.domainId),
    });
    return productCategoryObj.toJSON();
  }

  async update(productCategory: UpdateProductCategoryDto) {
    const updatedProductCategory = await ProductCategoryModal.findOneAndUpdate(
      { _id: new Types.ObjectId(productCategory.id), isActive: true },
      {
        name: productCategory.name,
        domainId: new Types.ObjectId(productCategory.domainId),
      },
      {
        new: true,
      },
    );
    return updatedProductCategory.toJSON();
  }

  async findAll(limit: number, pageNumber: number) {
    const productCategories = await ProductCategoryModal.find()
      .where({ isActive: true })
      .limit(limit)
      .skip((pageNumber - 1) * limit)
      .exec();

    const totalCount = await ProductCategoryModal.count({ isActive: true });
    return {
      data: productCategories,
      totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: string) {
    const productCategory = await ProductCategoryModal.findOne({
      _id: new Types.ObjectId(id),
      isActive: true,
    });
    return productCategory;
  }

  async delete(id: string) {
    await ProductCategoryModal.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { isActive: false },
    );
  }
}
