import { Types } from 'mongoose';
import { CreateCartItemDto } from 'src/shared/dto/cart-item/create-cart-item.dto';
import { UpdateCartItemDto } from 'src/shared/dto/cart-item/update-cart-item.dto';
import { CartItemModal } from 'src/shared/modals/cartItem.modal';

export class CartItemRepository {
  async create(cartItem: CreateCartItemDto) {
    const cartItemObj = await CartItemModal.create({
      userId: new Types.ObjectId(cartItem.userId),
      productId: new Types.ObjectId(cartItem.productId),
      quantity: cartItem.quantity,
    });
    await cartItemObj.populate('productId');
    return cartItemObj.toJSON();
  }

  async update(cartItem: UpdateCartItemDto) {
    const updatedCartItem = await CartItemModal.findOneAndUpdate(
      {
        _id: new Types.ObjectId(cartItem.id),
        userId: new Types.ObjectId(cartItem.userId),
        isActive: true,
      },
      {
        quantity: cartItem.quantity,
      },
      {
        new: true,
      },
    ).populate('productId');

    return updatedCartItem.toJSON();
  }

  async findByUserId(userId: string) {
    const cartItems = await CartItemModal.find({
      userId: new Types.ObjectId(userId),
      isActive: true,
    }).populate('productId');
    return cartItems;
  }

  async delete(id: string) {
    await CartItemModal.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { isActive: false },
    );
  }
}
