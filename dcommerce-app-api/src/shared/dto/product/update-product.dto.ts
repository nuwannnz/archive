export class UpdateProductDto {
  id: string;
  name: string;
  quantity: number;
  price: number;
  cost: number;
  description: string;
  briefDescription: string;
  images: string[];
  existingImages: string[];
  productCategoryId: string;
  domainId: string;
  variations: {
    id?: string;
    attributes: {
      productAttributeId: string;
      productAttributeOptionId: number;
    }[];
    quantity: number;
    price: number;
  }[];
  deletedVariationIds: string[];
}
