import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { adminProductReducer } from "./admin-products.slice";
import { adminProductCategoryReducer } from "./admin-product-category.slice";
import notificationReducer from "./notification.slice";
import { userRoleReducer } from "./user-role.slice";
import { productAttributeReducer } from "./admin-product-attribute.slice";

const combinedReducer = combineReducers({
  adminProduct: adminProductReducer,
  adminProductCategory: adminProductCategoryReducer,
  notification: notificationReducer,
  userRole: userRoleReducer,
  productAttribute: productAttributeReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "userRole/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
