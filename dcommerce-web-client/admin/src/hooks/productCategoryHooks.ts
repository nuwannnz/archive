import useSWR, { mutate } from "swr";
import {
  IProductCategory,
  IProductCategoryRequest,
} from "../types/productCategoryTypes";
import { objectToQuery } from "../helpers/urlHelpers";
import {
  IPaginatedRequestParams,
  IPaginatedResponse,
  MutateVariant,
} from "../types/common";
import { axiosInstance } from "../config/api";

export function useProductCategories(params: IPaginatedRequestParams) {
  const { data, error, isLoading, mutate } = useSWR<
    IPaginatedResponse<IProductCategory[]>
  >(`/product-category?${objectToQuery(params)}`);

  return {
    productCategories: data,
    isLoading,
    mutate,
    isError: error,
  };
}

export function useProductCategory(categoryId?: string) {
  const { data, error, isLoading } = useSWR<IProductCategory>(
    categoryId ? `/product-category/${categoryId}` : null
  );

  return {
    productCategory: data,
    isLoading,
    isError: error,
  };
}

export function useMutateProductCategory() {
  return {
    mutateProductCategory: (
      data: IProductCategoryRequest,
      mutateVariant: MutateVariant
    ) =>
      mutate("/product-category", async () => {
        if (mutateVariant === "Update") {
          return await axiosInstance.put(`/product-category/${data.id}`, {
            ...data,
          });
        } else if (mutateVariant === "Insert") {
          return await axiosInstance.post("/product-category", data);
        } else {
          return await axiosInstance.delete(`/product-category/${data.id}`);
        }
      }),
  };
}
