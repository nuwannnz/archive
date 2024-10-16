import { IDbRecord } from "./common";

export interface IProduct extends IDbRecord {
  name: string;
  quantity: number;
  price: number;
  cost: number;
  description: string;
  briefDescription: string;
  images: string[];
  productCategoryId: {
    _id: string;
    name: string;
  };
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

export interface IProductRequest {
  id?: string;
  name?: string;
  quantity?: number;
  price?: number;
  cost?: number;
  description?: string;
  briefDescription?: string;
  images?: string[];
  productCategoryId?: string;
  domainId?: string;
  variations?: {
    attributes: {
      productAttributeId: string;
      productAttributeOptionId: number;
    }[];
    quantity: number;
    price: number;
  }[];
  deletedVariationIds?: string[];
}
