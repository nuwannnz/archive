import React from "react";
import Login from "./pages/login";
import OrderList from "./pages/Admin/orders/OrdersList";
import ProductList from "./pages/Admin/product/ProductsList";
import ProductCategoryList from "./pages/Admin/productCategory/ProductCategoryList";
import ProductCategory from "./pages/Admin/productCategory/ProductCategory";
import AdminDashboard from "./components/adminDashboard/dashboard/AdminDashboard";
import Product from "./pages/Admin/product/Product";
import Order from "./pages/Admin/orders/Order";
import Setting from "./components/adminDashboard/setting/Setting";
import General from "./components/adminDashboard/setting/setttingPages/General";
import Mail from "./components/adminDashboard/setting/setttingPages/Mail";
import Home from "./pages/Customer/Home/Home";
import Signup from "./pages/signup";
import CheckoutPage from "./pages/Customer/CheckoutPage/CheckoutPage";
import ProductView from "./pages/Customer/ProductView/ProductView";
import Cart from "./pages/Customer/Cart";
import ViewProductList from "./pages/Customer/ProductListView/ViewProductList";
import ProductAttributeList from "./pages/Admin/productAttributes/ProductAttributeList";

export interface IRoute {
  key: number;
  isIndex?: boolean;
  name: string;
  isPublic?: boolean;
  permissions: string[];
  path: string;
  element: React.ReactElement;
  nestedRoutes?: IRoute[];
}

export const routeList: IRoute[] = [
  {
    key: 1,
    name: "Home",
    isPublic: true,
    permissions: [],
    path: "/",
    element: <Home />,
  },
  {
    key: 2,
    name: "SignUp",
    isPublic: true,
    permissions: [],
    path: "/signup",
    element: <Signup />,
  },
  {
    key: 3,
    name: "AdminLogin",
    isPublic: true,
    permissions: [],
    path: "/admin-auth",
    element: <Login />,
  },
  {
    key: 4,
    name: "Dashboard",
    isPublic: true,
    permissions: [],
    path: "/admin",
    element: <AdminDashboard />,
    nestedRoutes: [
      {
        isIndex: true,
        key: 5,
        name: "Products List",
        permissions: ["GET:/product"],
        path: "/admin/products",
        element: <ProductList />,
      },
      {
        key: 6,
        name: "OrderList",
        permissions: ["GET:/category"],
        path: "/admin/orders",
        element: <OrderList />,
      },
      {
        key: 7,
        name: "OrderPage",
        permissions: ["GET:/product"],
        path: "/admin/order/:mode/:id",
        element: <Order />,
      },
      {
        key: 8,
        name: "Setting",
        permissions: ["GET:/category"],
        path: "/admin/setting",
        element: <Setting />,
        nestedRoutes: [
          {
            key: 9,
            name: "Create product",
            permissions: ["GET:/product", "POST:/product"],
            path: "/admin/setting/general",
            element: <General />,
          },
          {
            key: 10,
            name: "Update product",
            permissions: ["GET:/product", "PUT:/product"],
            path: "/admin/setting/mail",
            element: <Mail />,
          },
        ],
      },
      {
        key: 11,
        name: "Order",
        permissions: ["GET:/product"],
        path: "/admin/order/:mode/:id",
        element: <Order />,
      },
      {
        key: 12,
        name: "ProductCategoryList",
        permissions: ["GET:/product-category"],
        path: "/admin/product-categories",
        element: <ProductCategoryList />,
      },
      {
        key: 13,
        name: "ProductCategory",
        permissions: ["GET:/product"],
        path: "/admin/product-category/:mode/:id",
        element: <ProductCategory />,
      },
      {
        key: 14,
        name: "ProductCategoryListMode",
        permissions: ["GET:/product"],
        path: "/admin/product-category/:mode",
        element: <ProductCategory />,
      },
      {
        key: 15,
        name: "Product",
        permissions: ["GET:/product"],
        path: "/admin/product/:mode/:id",
        element: <Product />,
      },
      {
        key: 16,
        name: "Product",
        permissions: ["GET:/product"],
        path: "/admin/product/:mode",
        element: <Product />,
      },
      {
        key: 17,
        name: "ProductAttribute",
        permissions: ["GET:/product-attribute"],
        path: "/admin/product-attributes",
        element: <ProductAttributeList />,
      },
    ],
  },
  {
    key: 18,
    name: "ProductView",
    isPublic: true,
    permissions: [],
    path: "/product/:id",
    element: <ProductView />,
  },
  {
    key: 19,
    name: "Products",
    isPublic: true,
    permissions: [],
    path: "/products",
    element: <ViewProductList />,
  },
  {
    key: 20,
    name: "CheckoutPageLayout",
    isPublic: true,
    permissions: [],
    path: "/product_checkout_page",
    element: <CheckoutPage />,
  },
  {
    key: 21,
    name: "Cart",
    permissions: ["POST:/cart-item"],
    path: "/cart",
    element: <Cart />,
  },
];
