export interface IAdminProductCategory {
  id?: string;
  _id?: string;
  name: string;
  domainId?: string;
}

export interface IAdminProductCategoryRequest {
  limit: number;
  pageNumber?: number;
  searchKey?: string | null;
  sortKey?: string;
  sortOrder?: string;
}

export interface IAdminProductCategoryPaginated {
  currentPage: string;
  data: IAdminProductCategory[];
  totalCount: number;
  totalPages: number;
}
