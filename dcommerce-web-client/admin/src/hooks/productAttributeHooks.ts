import useSWR, { mutate } from "swr";
import { objectToQuery } from "../helpers/urlHelpers";
import {
  IPaginatedRequestParams,
  IPaginatedResponse,
  MutateVariant,
} from "../types/common";
import { axiosInstance } from "../config/api";
import {
  IProductAttribute,
  IProductAttributeRequest,
} from "../types/productAttributeTypes";

export function useProductAttributes(params: IPaginatedRequestParams) {
  const { data, error, isLoading, mutate } = useSWR<
    IPaginatedResponse<IProductAttribute[]>
  >(`/product-attribute?${objectToQuery(params)}`);

  return {
    productAttributes: data,
    isLoading,
    mutate,
    isError: error,
  };
}

export function useProductAttribute(attributeId?: string) {
  const { data, error, isLoading } = useSWR<IProductAttribute>(
    attributeId ? `/product-attribute/${attributeId}` : null
  );

  return {
    productAttribute: data,
    isLoading,
    isError: error,
  };
}

export function useMutateProductAttribute() {
  return {
    mutateProductAttribute: (
      data: IProductAttributeRequest,
      mutateVariant: MutateVariant
    ) =>
      mutate("/product-attribute", async () => {
        if (mutateVariant === "Update") {
          return await axiosInstance.put(`/product-attribute/${data.id}`, {
            ...data,
          });
        } else if (mutateVariant === "Insert") {
          return await axiosInstance.post("/product-attribute", data);
        } else {
          return await axiosInstance.delete(`/product-attribute/${data.id}`);
        }
      }),
  };
}
