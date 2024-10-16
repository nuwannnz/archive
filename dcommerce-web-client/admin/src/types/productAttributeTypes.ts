import { IDbRecord } from "./common";

export interface IProductAttribute extends IDbRecord {
  name: string;
  options: {
    id: string;
    name: string;
  }[];
}

export interface IProductAttributeRequest {
  id?: string;
  name?: string;
  options?: {
    id?: string;
    name: string;
  }[];
  deletedOptionIds?: string[];
}
