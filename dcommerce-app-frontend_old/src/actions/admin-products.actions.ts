import { AxiosResponse } from "axios";
import API from "../service/API";
import { AppDispatch } from "../store";
import { adminProductActions } from "../store/admin-products.slice";
import { setNotification } from "../store/notification.slice";
import {
  IAddAdminProduct,
  IAdminProductRequest,
  IUpdateProduct,
} from "../types/AdminProduct";
import { serialize } from "../util";

export function fetchProductList(data: IAdminProductRequest) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductActions.adminProductFetchStart());

    try {
      const res: AxiosResponse = await API.get(`product?${serialize(data)}`);

      dispatch(adminProductActions.adminProductFetchSuccess(res.data));
    } catch (err: any) {
      dispatch(
        adminProductActions.adminProductFetchError(
          err.message ?? "Failed to fetch admin products"
        )
      );
    }
  };
}

export function addProduct(data: IAddAdminProduct) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductActions.adminProductAddStart());
    try {
      const res: AxiosResponse = await API.post(`product`, data);

      if (res.status === 200) {
        dispatch(adminProductActions.adminProductAddSuccess(res.data));
        dispatch(
          setNotification({
            type: "success",
            message: "Product Added Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to add product";
      dispatch(
        adminProductActions.adminProductAddError(err.message ?? errMessage)
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

export function updateProduct(data: IUpdateProduct) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductActions.adminProductAddStart());
    try {
      const res: AxiosResponse = await API.put(`product/${data.id}`, data);

      if (res.status === 200) {
        dispatch(adminProductActions.adminProductAddSuccess(res.data));
        dispatch(
          setNotification({
            type: "success",
            message: "Product Updated Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to update product";
      dispatch(
        adminProductActions.adminProductAddError(err.message ?? errMessage)
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

export function getProductById(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductActions.productGetStart());

    try {
      const res: AxiosResponse = await API.get(`product/${id}`);

      dispatch(adminProductActions.productGetSuccess(res.data));
    } catch (err: any) {
      dispatch(
        adminProductActions.productGetError(
          err.message ?? "Failed to fetch admin products"
        )
      );
    }
  };
}

export function deleteProduct(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductActions.productDeleteStart());
    try {
      const res: AxiosResponse = await API.delete(`product/${id}`);

      if (res.status === 200) {
        dispatch(adminProductActions.productDeleteSuccess(res.status));
        dispatch(
          setNotification({
            type: "success",
            message: "Product Deleted Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to delete Product";
      dispatch(
        adminProductActions.productDeleteError(err.message ?? errMessage)
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
