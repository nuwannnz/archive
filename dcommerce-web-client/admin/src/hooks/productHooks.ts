import useSWR, { mutate } from "swr";
import { objectToQuery } from "../helpers/urlHelpers";
import {
  IPaginatedRequestParams,
  IPaginatedResponse,
  MutateVariant,
} from "../types/common";
import { axiosInstance } from "../config/api";
import { IProduct, IProductRequest } from "../types/productTypes";

export function useProducts(params: IPaginatedRequestParams) {
  const { data, error, isLoading, mutate } = useSWR<
    IPaginatedResponse<IProduct[]>
  >(`/product?${objectToQuery(params)}`);

  return {
    products: data,
    isLoading,
    mutate,
    isError: error,
  };
}

export function useProduct(productId?: string) {
  const { data, error, isLoading } = useSWR<IProduct>(
    productId ? `/product/${productId}` : null
  );

  return {
    product: data,
    isLoading,
    isError: error,
  };
}

export function useMutateProduct() {
  return {
    mutateProduct: (data: IProductRequest, mutateVariant: MutateVariant) =>
      mutate("/product", async () => {
        if (mutateVariant === "Update") {
          return await axiosInstance.put(`/product/${data.id}`, {
            ...data,
          });
        } else if (mutateVariant === "Insert") {
          return await axiosInstance.post("/product", data);
        } else {
          return await axiosInstance.delete(`/product/${data.id}`);
        }
      }),
  };
}
