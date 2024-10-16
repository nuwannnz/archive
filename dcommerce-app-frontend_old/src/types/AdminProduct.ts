export interface IAdminProduct {
  id?: string;
  _id?: string;
  name: string;
  productCategoryId: { _id?: string; name: string };
  images: string[];
  quantity?: number;
  price?: number;
  cost?: number;
  description?: string;
  briefDescription?: string;
}

export interface IAdminProductPaginated {
  currentPage: string;
  data: IAdminProduct[];
  totalCount: number;
  totalPages: number;
}

export interface IAddAdminProduct {
  name: string;
  price: number;
  quantity: number;
  cost: number;
  description: string;
  briefDescription: string;
  productCategoryId: string;
  images: string[];
}

export interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  cost: number;
  description: string;
  briefDescription: string;
  productCategoryId: string;
  images: string[];
  existingImages: string[];
}

export interface IAdminProductRequest {
  limit: number;
  pageNumber?: number;
  searchKey?: string | null;
  sortKey?: string;
  sortOrder?: string;
}

export interface IProductImage extends File {
  preview: string;
  base64: string;
}
