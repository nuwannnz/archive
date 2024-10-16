import { Types } from 'mongoose';

import { ProductVariantModal } from 'src/shared/modals/product-variant.modal';

export class ProductVariantRepository {
  async findOne(id: string, domainId: string) {
    const productVariant = await ProductVariantModal.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
          isActive: true,
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $match: {
          'product.domainId': new Types.ObjectId(domainId),
          'product.isActive': true,
        },
      },
    ]);
    return productVariant;
  }
}
