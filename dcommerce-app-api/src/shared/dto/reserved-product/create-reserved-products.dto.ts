export class CreateReservedProductsDto {
  userId: string;
  cartItems: { productVariantId: string; quantity: number }[];
}
