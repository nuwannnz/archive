import { ReservedProductRepository } from '../../shared/repositories/reserved-product/reserved-product-repository';
import { HttpError } from 'src/shared/types/HttpError';
import { ProductVariantRepository } from 'src/shared/repositories/product-variant/product-variant-repository';
import { CreateReservedProductsDto } from 'src/shared/dto/reserved-product/create-reserved-products.dto';

export class ReservedProductService {
  constructor(
    private reservedProductRepository: ReservedProductRepository,
    private productVariantRepository: ProductVariantRepository,
  ) {}

  async createReservedProducts(
    domainId: string,
    createReservedProductsDto: CreateReservedProductsDto,
  ) {
    const productVariantValidationPromises =
      createReservedProductsDto.cartItems.map((item) =>
        productVariantValidation(
          createReservedProductsDto.userId,
          domainId,
          item.productVariantId,
          item.quantity,
          this.productVariantRepository,
          this.reservedProductRepository,
        ),
      );
    await Promise.all(productVariantValidationPromises);
    const updatedCartItem = await Promise.all(
      createReservedProductsDto.cartItems.map((cartItem) => ({
        ...cartItem,
        userId: createReservedProductsDto.userId,
      })),
    );
    const updatedCreateReservedProductsDto = {
      userId: createReservedProductsDto.userId,
      cartItems: updatedCartItem,
    };
    return this.reservedProductRepository.create(
      updatedCreateReservedProductsDto,
    );
  }
}

async function productVariantValidation(
  userId: string,
  domainId: string,
  productVariantId: string,
  quantity: number,
  productVariantRepository: ProductVariantRepository,
  reservedProductRepository: ReservedProductRepository,
): Promise<void> {
  const productVariant = await productVariantRepository.findOne(
    productVariantId,
    domainId,
  );
  console.log(productVariant);

  if (!productVariant) {
    throw new HttpError(
      400,
      'Invalid product or product does not belong to the domain',
    );
  }
  if (productVariant[0].quantity < quantity) {
    throw new HttpError(400, 'Quantity exceeds the available quantity');
  }
  const reservedQuantity =
    await reservedProductRepository.findReservedQuantityByProductVariantId(
      productVariantId,
      userId,
    );
  console.log(reservedQuantity);

  if (
    reservedQuantity[0] &&
    productVariant[0].quantity - reservedQuantity[0].quantity < quantity
  ) {
    throw new HttpError(400, 'Quantity exceeds the available quantity');
  }
}
