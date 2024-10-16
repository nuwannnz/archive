import { IDbRecord } from "./common";

export interface IProductCategory extends IDbRecord {
  name: string;
}

export interface IProductCategoryRequest {
  id?: string;
  name?: string;
}
