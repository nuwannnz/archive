import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminProduct, IAdminProductPaginated } from "../types/AdminProduct";
import { NullableNumber, NullableString } from "../types/common";

interface IAdminProductsState {
  adminProductList: {
    isFetching: boolean;
    data: IAdminProductPaginated;
    error: NullableString;
  };
  addAdminProduct: {
    isFetching: boolean;
    data: NullableNumber;
    error: NullableString;
  };
  product: {
    isFetching: boolean;
    data: IAdminProduct;
    error: NullableString;
  };
  deleteProduct: {
    isFetching: boolean;
    data: NullableNumber;
    error: NullableString;
  };
}

const initialState: IAdminProductsState = {
  adminProductList: {
    isFetching: false,
    data: { currentPage: "1", data: [], totalCount: 0, totalPages: 1 },
    error: null,
  },
  addAdminProduct: {
    isFetching: false,
    data: null,
    error: null,
  },
  product: {
    isFetching: false,
    data: {
      images: [],
      _id: "",
      name: "",
      quantity: 0,
      productCategoryId: {
        _id: "",
        name: "",
      },
    },
    error: null,
  },
  deleteProduct: {
    isFetching: false,
    data: null,
    error: null,
  },
};

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {
    // Fetch
    adminProductFetchStart: (state) => {
      state.adminProductList = {
        isFetching: true,
        data: { currentPage: "1", data: [], totalCount: 0, totalPages: 1 },
        error: null,
      };
    },
    adminProductFetchSuccess: (
      state,
      action: PayloadAction<IAdminProductPaginated>
    ) => {
      state.adminProductList = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    adminProductFetchError: (state, action: PayloadAction<string>) => {
      state.adminProductList = {
        isFetching: false,
        data: { currentPage: "1", data: [], totalCount: 0, totalPages: 1 },
        error: action.payload,
      };
    },
    resetAdminProductFetch: (state) => {
      state.adminProductList = initialState.adminProductList;
    },

    // Add
    adminProductAddStart: (state) => {
      state.addAdminProduct = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    adminProductAddSuccess: (state, action: PayloadAction<number>) => {
      state.addAdminProduct = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    adminProductAddError: (state, action: PayloadAction<string>) => {
      state.addAdminProduct = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetAdminProductAdd: (state) => {
      state.addAdminProduct = initialState.addAdminProduct;
    },

    // getProductById
    productGetStart: (state) => {
      state.product = {
        isFetching: true,
        data: initialState.product.data,
        error: null,
      };
    },
    productGetSuccess: (state, action: PayloadAction<IAdminProduct>) => {
      state.product = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    productGetError: (state, action: PayloadAction<string>) => {
      state.product = {
        isFetching: false,
        data: initialState.product.data,
        error: action.payload,
      };
    },
    resetProductGet: (state) => {
      state.product = initialState.product;
    },

    // deleteProduct
    productDeleteStart: (state) => {
      state.deleteProduct = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    productDeleteSuccess: (state, action: PayloadAction<number>) => {
      state.deleteProduct = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    productDeleteError: (state, action: PayloadAction<string>) => {
      state.deleteProduct = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetProductDelete: (state) => {
      state.deleteProduct = initialState.deleteProduct;
    },
  },
});

export const { actions: adminProductActions, reducer: adminProductReducer } =
  adminProductSlice;
