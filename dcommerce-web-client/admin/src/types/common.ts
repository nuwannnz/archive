export interface IPaginatedRequestParams {
  limit: number;
  pageNumber: number;
  search?: string;
  sort?: string;
  order?: string;
}

export interface IPaginatedResponse<T> {
  currentPage: string;
  data: T;
  totalCount: number;
  totalPages: number;
}

export interface IDbRecord {
  _id?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type MutateVariant = "Insert" | "Update" | "Delete";
