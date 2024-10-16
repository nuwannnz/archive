import { CartItemRepository } from 'src/shared/repositories/cart-item/cart-item-repository';
import { CreateCartItemDto } from 'src/shared/dto/cart-item/create-cart-item.dto';
import { UpdateCartItemDto } from 'src/shared/dto/cart-item/update-cart-item.dto';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

export class CartItemService {
  constructor(private cartItemRepository: CartItemRepository) {}

  async createCartItem(createCartItemDto: CreateCartItemDto) {
    return this.cartItemRepository.create(createCartItemDto);
  }

  async updateCartItem(updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemRepository.update(updateCartItemDto);
  }

  getCartItemsByUserId(userId: string) {
    return this.cartItemRepository.findByUserId(userId);
  }

  deleteCartItem(id: string) {
    return this.cartItemRepository.delete(id);
  }
}
