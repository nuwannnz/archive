export type NullableString = string | null;
export type NullableNumber = number | null;
export interface PaginationType {
  limit: number;
  pageNumber: number;
}

export interface IPaginatedResponse<T> {
  currentPage: string;
  totalCount: number;
  totalPages: number;
  data: T[];
}
