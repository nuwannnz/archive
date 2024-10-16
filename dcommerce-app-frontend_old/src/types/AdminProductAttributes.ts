export interface IProductAttribute {
  _id?: string;
  name: string;
  options: {
    name: string;
    id: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductAttributesRequest {
  limit: number;
  pageNumber?: number;
  searchKey?: string | null;
  sortKey?: string;
  sortOrder?: string;
}

export interface IAddProductAttributeRequest {
  name: string;
  options: {
    name: string;
  }[];
}

export interface IUpdateroductAttributeRequest {
  id: string;
  payload: {
    name: string;
    options: {
      id?: string;
      name: string;
    }[];
    deletedOptionIds: string[];
  };
}
