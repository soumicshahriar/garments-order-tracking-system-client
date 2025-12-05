import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../pages/AllProducts/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "all-products", Component: AllProducts },
      { path: "product-details/:id", Component: ProductDetails },
    ],
  },
]);
