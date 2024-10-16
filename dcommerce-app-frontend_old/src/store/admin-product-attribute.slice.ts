import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPaginatedResponse,
  NullableNumber,
  NullableString,
} from "../types/common";
import { IProductAttribute } from "../types/AdminProductAttributes";

interface IAdminProductAttributesState {
  productAttributes: {
    isFetching: boolean;
    data: IPaginatedResponse<IProductAttribute> | null;
    error: NullableString;
  };
  productAttributeById: {
    isFetching: boolean;
    data: IProductAttribute | null;
    error: NullableString;
  };
  addProductAttribute: {
    isFetching: boolean;
    data: IProductAttribute | null;
    error: NullableString;
  };
  updateProductAttribute: {
    isFetching: boolean;
    data: IProductAttribute | null;
    error: NullableString;
  };
  deleteProductAttribute: {
    isFetching: boolean;
    data: NullableNumber | null;
    error: NullableString;
  };
}

const initialState: IAdminProductAttributesState = {
  productAttributes: {
    isFetching: false,
    data: null,
    error: null,
  },
  productAttributeById: {
    isFetching: false,
    data: null,
    error: null,
  },
  addProductAttribute: {
    isFetching: false,
    data: null,
    error: null,
  },
  updateProductAttribute: {
    isFetching: false,
    data: null,
    error: null,
  },
  deleteProductAttribute: {
    isFetching: false,
    data: null,
    error: null,
  },
};

const adminProductAttributeSlice = createSlice({
  name: "adminProductAttribute",
  initialState,
  reducers: {
    // Fetch
    fetchProductAttributeStart: (state) => {
      state.productAttributes = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    fetchProductAttributeSuccess: (
      state,
      action: PayloadAction<IPaginatedResponse<IProductAttribute>>
    ) => {
      state.productAttributes = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    fetchProductAttributeError: (state, action: PayloadAction<string>) => {
      state.productAttributes = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetFetchProductAttribute: (state) => {
      state.productAttributes = initialState.productAttributes;
    },

    // Add
    addProductAttributeStart: (state) => {
      state.addProductAttribute = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    addProductAttributeSuccess: (
      state,
      action: PayloadAction<IProductAttribute>
    ) => {
      state.addProductAttribute = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    addProductAttributeError: (state, action: PayloadAction<string>) => {
      state.addProductAttribute = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetAddProductAttribute: (state) => {
      state.addProductAttribute = initialState.addProductAttribute;
    },

    // Add
    updateProductAttributeStart: (state) => {
      state.updateProductAttribute = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    updateProductAttributeSuccess: (
      state,
      action: PayloadAction<IProductAttribute>
    ) => {
      state.updateProductAttribute = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    updateProductAttributeError: (state, action: PayloadAction<string>) => {
      state.updateProductAttribute = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetUpdateProductAttribute: (state) => {
      state.updateProductAttribute = initialState.updateProductAttribute;
    },

    // getProductById
    getProductAttributeByIdStart: (state) => {
      state.productAttributeById = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    getProductAttributeByIdSuccess: (
      state,
      action: PayloadAction<IProductAttribute>
    ) => {
      state.productAttributeById = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    getProductAttributeByIdError: (state, action: PayloadAction<string>) => {
      state.productAttributeById = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetGetProductAttributeById: (state) => {
      state.productAttributeById = initialState.productAttributeById;
    },

    // deleteProduct
    deleteProductAttributeStart: (state) => {
      state.deleteProductAttribute = {
        isFetching: true,
        data: null,
        error: null,
      };
    },
    deleteProductAttributeSuccess: (state, action: PayloadAction<number>) => {
      state.deleteProductAttribute = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },
    deleteProductAttributeError: (state, action: PayloadAction<string>) => {
      state.deleteProductAttribute = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },
    resetDeleteProductAttribute: (state) => {
      state.deleteProductAttribute = initialState.deleteProductAttribute;
    },
  },
});

export const {
  actions: productAttributeActions,
  reducer: productAttributeReducer,
} = adminProductAttributeSlice;
