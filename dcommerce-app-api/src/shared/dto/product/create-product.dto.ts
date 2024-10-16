export class CreateProductDto {
  name: string;
  quantity: number;
  price: number;
  cost: number;
  description: string;
  briefDescription: string;
  images: string[];
  productCategoryId: string;
  domainId: string;
  variations: {
    attributes: {
      productAttributeId: string;
      productAttributeOptionId: number;
    }[];
    quantity: number;
    price: number;
  }[];
}
