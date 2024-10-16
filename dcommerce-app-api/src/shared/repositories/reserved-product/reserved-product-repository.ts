import { Types, startSession } from 'mongoose';
import { CreateReservedProductItemDto } from 'src/shared/dto/reserved-product/create-reserved-product-item.dto';
import { ReservedProductModal } from 'src/shared/modals/reservedProduct.modal';

export class ReservedProductRepository {
  async create(reservedProducts: CreateReservedProductItemDto) {
    const session = await startSession();
    session.startTransaction();
    try {
      await ReservedProductModal.updateMany(
        {
          userId: new Types.ObjectId(reservedProducts.userId),
        },
        { $set: { isActive: false } },
        { session },
      );
      const reserveProductsObj = await ReservedProductModal.insertMany(
        reservedProducts.cartItems,
        {
          session,
        },
      );
      await session.commitTransaction();
      return reserveProductsObj;
    } catch (error) {
      await session.abortTransaction();
      return error;
    }
  }

  async findReservedQuantityByProductVariantId(
    productVariantId: string,
    userId: string,
  ) {
    const reservedProductQuantity = await ReservedProductModal.aggregate([
      {
        $match: {
          userId: { $ne: new Types.ObjectId(userId) },
          productVariantId: new Types.ObjectId(productVariantId),
          isActive: true,
        },
      },
      { $group: { _id: null, quantity: { $sum: '$quantity' } } },
      { $project: { quantity: 1 } },
    ]);
    return reservedProductQuantity;
  }

  async delete(productVariantId: string, userId: string) {
    await ReservedProductModal.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { productVariantId: new Types.ObjectId(productVariantId) },
      { isActive: false },
    );
  }
}
