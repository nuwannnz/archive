import { AxiosResponse } from "axios";
import API from "../service/API";
import { AppDispatch } from "../store";
import { adminProductCategoryAction } from "../store/admin-product-category.slice";
import { setNotification } from "../store/notification.slice";
import {
  IAdminProductCategory,
  IAdminProductCategoryRequest,
} from "../types/AdminProductCategoty";
import { serialize } from "../util";

export function fetchProductCategoryList(data: IAdminProductCategoryRequest) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductCategoryAction.adminProductCategoryFetchStart());
    try {
      const res: AxiosResponse = await API.get(
        `product-category?${serialize(data)}`
      );
      dispatch(
        adminProductCategoryAction.adminProductCategoryFetchSuccess(res.data)
      );
    } catch (err: any) {
      dispatch(
        adminProductCategoryAction.adminProductCategoryFetchError(
          err.message ?? "Failed to fetch admin product Categories"
        )
      );
    }
  };
}

export function addProductCategory(data: IAdminProductCategory) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductCategoryAction.adminProductCategoryAddStart());
    try {
      const res: AxiosResponse = await API.post(`product-category`, data);

      if (res.status === 200) {
        dispatch(
          adminProductCategoryAction.adminProductCategoryAddSuccess(res.data)
        );
        dispatch(
          setNotification({
            type: "success",
            message: "Product Category Added Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to add product-category";
      dispatch(
        adminProductCategoryAction.adminProductCategoryAddError(
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

export function updateProductCategory(data: IAdminProductCategory) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductCategoryAction.adminProductCategoryAddStart());
    try {
      const res: AxiosResponse = await API.put(
        `product-category/${data.id}`,
        data
      );

      if (res.status === 200) {
        dispatch(
          adminProductCategoryAction.adminProductCategoryAddSuccess(res.data)
        );
        dispatch(
          setNotification({
            type: "success",
            message: "Product Category Updated Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to update Product Category";
      dispatch(
        adminProductCategoryAction.adminProductCategoryAddError(
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

export function getProductCategoryById(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductCategoryAction.productCategoryGetStart());

    try {
      const res: AxiosResponse = await API.get(`product-category/${id}`);

      dispatch(adminProductCategoryAction.productCategoryGetSuccess(res.data));
    } catch (err: any) {
      dispatch(
        adminProductCategoryAction.productCategoryGetError(
          err.message ?? "Failed to fetch product categories"
        )
      );
    }
  };
}

export function deleteProductCategory(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(adminProductCategoryAction.productCategoryDeleteStart());
    try {
      const res: AxiosResponse = await API.delete(`product-category/${id}`);

      if (res.status === 200) {
        dispatch(
          adminProductCategoryAction.productCategoryDeleteSuccess(res.status)
        );
        dispatch(
          setNotification({
            type: "success",
            message: "Product Category Deleted Successful",
          })
        );
      }
    } catch (err: any) {
      const errMessage = "Failed to delete Product Category";
      dispatch(
        adminProductCategoryAction.productCategoryDeleteError(
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
