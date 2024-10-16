export class CreateReservedProductItemDto {
  userId: string;
  cartItems: { userId: string; productVariantId: string; quantity: number }[];
}
