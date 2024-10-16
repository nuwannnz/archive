import { AxiosResponse } from "axios";
import { AppDispatch } from "../store";
import { productAttributeActions } from "../store/admin-product-attribute.slice";
import {
  IAddProductAttributeRequest,
  IProductAttributesRequest,
  IUpdateroductAttributeRequest as IUpdateProductAttributeRequest,
} from "../types/AdminProductAttributes";
import API from "../service/API";
import { serialize } from "../util";
import { setNotification } from "../store/notification.slice";

export function fetchProductAttributeList(data: IProductAttributesRequest) {
  return async (dispatch: AppDispatch) => {
    dispatch(productAttributeActions.fetchProductAttributeStart());

    try {
      const res: AxiosResponse = await API.get(
        `product-attribute?${serialize(data)}`
      );

      dispatch(productAttributeActions.fetchProductAttributeSuccess(res.data));
    } catch (err: any) {
      dispatch(
        productAttributeActions.fetchProductAttributeError(
          err.message ?? "Failed to fetch product attributes"
        )
      );
    }
  };
}

export function addProductAttributeAsync(data: IAddProductAttributeRequest) {
  return async (dispatch: AppDispatch) => {
    dispatch(productAttributeActions.addProductAttributeStart());
    try {
      const res: AxiosResponse = await API.post(`product-attribute`, data);

      if (res.status === 200) {
        dispatch(productAttributeActions.addProductAttributeSuccess(res.data));
        dispatch(
          setNotification({
            type: "success",
            message: "Product Attribute Added Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to add product attribute";
      dispatch(
        productAttributeActions.addProductAttributeError(
          err.message ?? errMessage
        )
      );
      dispatch(
        setNotification({
          type: "error",
          message: err.message || errMessage,
        })
      );
    }
  };
}

export function updateProductAttribute(data: IUpdateProductAttributeRequest) {
  return async (dispatch: AppDispatch) => {
    dispatch(productAttributeActions.updateProductAttributeStart());
    try {
      const res: AxiosResponse = await API.put(
        `product-attribute/${data.id}`,
        data.payload
      );

      if (res.status === 200) {
        dispatch(
          productAttributeActions.updateProductAttributeSuccess(res.data)
        );
        dispatch(
          setNotification({
            type: "success",
            message: "Product Attribute Updated Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to Update Product Attribute";
      dispatch(
        productAttributeActions.updateProductAttributeError(
          err.message ?? errMessage
        )
      );
      dispatch(
        setNotification({
          type: "error",
          message: err.message || errMessage,
        })
      );
    }
  };
}

export function getProductAttributeById(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(productAttributeActions.getProductAttributeByIdStart());

    try {
      const res: AxiosResponse = await API.get(`product-attribute/${id}`);

      dispatch(
        productAttributeActions.getProductAttributeByIdSuccess(res.data)
      );
    } catch (err: any) {
      dispatch(
        productAttributeActions.getProductAttributeByIdError(
          err.message ?? "Failed to fetch product attribute"
        )
      );
    }
  };
}

export function deleteProductAttribute(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(productAttributeActions.deleteProductAttributeStart());
    try {
      const res: AxiosResponse = await API.delete(`product-attribute/${id}`);

      if (res.status === 200) {
        dispatch(
          productAttributeActions.deleteProductAttributeSuccess(res.status)
        );
        dispatch(
          setNotification({
            type: "success",
            message: "Product Attribute Deleted Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to Delete Product Attribute";
      dispatch(
        productAttributeActions.deleteProductAttributeError(
          err.message ?? errMessage
        )
      );
      dispatch(
        setNotification({
          type: "error",
          message: err.message || errMessage,
        })
      );
    }
  };
}
