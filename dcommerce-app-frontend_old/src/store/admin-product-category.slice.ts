import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAdminProductCategory,
  IAdminProductCategoryPaginated,
} from "../types/AdminProductCategoty";
import { NullableNumber, NullableString } from "../types/common";

interface AdminProductCategoryState {
  adminProductCategoryList: {
    isFetching: boolean;
    data: IAdminProductCategoryPaginated;
    error: NullableString;
  };
  addAdminProductCategory: {
    isFetching: boolean;
    data: NullableNumber;
    error: NullableString;
  };
  productCategory: {
    isFetching: boolean;
    data: IAdminProductCategory;
    error: NullableString;
  };
  deleteProductCategory: {
    isFetching: boolean;
    data: NullableNumber;
    error: NullableString;
  };
}

const initialState: AdminProductCategoryState = {
  adminProductCategoryList: {
    isFetching: false,
    data: { currentPage: "1", data: [], totalCount: 0, totalPages: 1 },
    error: null,
  },
  addAdminProductCategory: {
    isFetching: false,
    data: null,
    error: null,
  },
  productCategory: {
    isFetching: false,
    data: { name: "" },
    error: null,
  },
  deleteProductCategory: {
    isFetching: false,
    data: null,
    error: null,
  },
};

const adminProductCategorySlice = createSlice({
  name: "adminProductCategory",
  initialState,
  reducers: {
    // Fetch
    adminProductCategoryFetchStart: (state) => {
      state.adminProductCategoryList = {
        isFetching: true,
        data: initialState.adminProductCategoryList.data,
        error: null,
      };
    },
    adminProductCategoryFetchSuccess: (
      state,
      action: PayloadAction<IAdminProductCategoryPaginated>
    ) => {
      state.adminProductCategoryList = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    adminProductCategoryFetchError: (state, action: PayloadAction<string>) => {
      state.adminProductCategoryList = {
        isFetching: false,
        data: initialState.adminProductCategoryList.data,
        error: action.payload,
      };
    },
    resetAdminProductCategoryFetch: (state) => {
      state.adminProductCategoryList = initialState.adminProductCategoryList;
    },

    // Add
    adminProductCategoryAddStart: (state) => {
      state.addAdminProductCategory = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    adminProductCategoryAddSuccess: (state, action: PayloadAction<number>) => {
      state.addAdminProductCategory = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    adminProductCategoryAddError: (state, action: PayloadAction<string>) => {
      state.addAdminProductCategory = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetAdminProductCategoryAdd: (state) => {
      state.addAdminProductCategory = initialState.addAdminProductCategory;
    },

    // getProductCategoryById
    productCategoryGetStart: (state) => {
      state.productCategory = {
        isFetching: true,
        data: initialState.productCategory.data,
        error: null,
      };
    },
    productCategoryGetSuccess: (
      state,
      action: PayloadAction<IAdminProductCategory>
    ) => {
      state.productCategory = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    productCategoryGetError: (state, action: PayloadAction<string>) => {
      state.productCategory = {
        isFetching: false,
        data: initialState.productCategory.data,
        error: action.payload,
      };
    },
    resetProductCategoryGet: (state) => {
      state.productCategory = initialState.productCategory;
    },

    // deleteProductCategory
    productCategoryDeleteStart: (state) => {
      state.deleteProductCategory = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    productCategoryDeleteSuccess: (state, action: PayloadAction<number>) => {
      state.deleteProductCategory = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    productCategoryDeleteError: (state, action: PayloadAction<string>) => {
      state.deleteProductCategory = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetProductCategoryDelete: (state) => {
      state.deleteProductCategory = initialState.deleteProductCategory;
    },
  },
});

export const {
  actions: adminProductCategoryAction,
  reducer: adminProductCategoryReducer,
} = adminProductCategorySlice;
