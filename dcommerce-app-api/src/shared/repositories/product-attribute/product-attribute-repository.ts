import { Types } from 'mongoose';
import { CreateProductAttributeDto } from 'src/shared/dto/product-attribute/create-product-attribute.dto';
import { UpdateProductAttributeDto } from 'src/shared/dto/product-attribute/update-product-attribute.dto';
import { ProductAttributeModal } from 'src/shared/modals/product-attribute.modal';

export class ProductAttributeRepository {
  async create(productAttribute: CreateProductAttributeDto) {
    const productAttributeObj = await ProductAttributeModal.create({
      name: productAttribute.name,
      domainId: new Types.ObjectId(productAttribute.domainId),
      options: productAttribute.options.map((option) => ({
        ...option,
        isActive: true,
      })),
    });
    return productAttributeObj.toJSON();
  }

  async update(productAttribute: UpdateProductAttributeDto) {
    const updatedProductAttribute =
      await ProductAttributeModal.findOneAndUpdate(
        { _id: new Types.ObjectId(productAttribute.id), isActive: true },
        {
          name: productAttribute.name,
          options: productAttribute.options,
        },
        {
          new: true,
        },
      );
    return updatedProductAttribute.toJSON();
  }

  async findAll(limit: number, pageNumber: number, domainId: string) {
    const productAttributes = await ProductAttributeModal.find()
      .where({ domainId: new Types.ObjectId(domainId), isActive: true })
      .limit(limit)
      .skip((pageNumber - 1) * limit)
      .exec();

    const totalCount = await ProductAttributeModal.count({ isActive: true });
    return {
      data: productAttributes,
      totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: string, domainId: string) {
    const productAttribute = await ProductAttributeModal.findOne({
      _id: new Types.ObjectId(id),
      domainId: new Types.ObjectId(domainId),
      isActive: true,
    });
    return productAttribute;
  }

  async delete(id: string, domainId: string) {
    await ProductAttributeModal.findOneAndUpdate(
      { _id: new Types.ObjectId(id), domainId: new Types.ObjectId(domainId) },
      { isActive: false },
    );
  }
}
