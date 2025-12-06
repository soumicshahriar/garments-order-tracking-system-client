import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../pages/AllProducts/ProductDetails";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboards/AdminDashBoard/ManageUsers/ManageUsers";
import Products from "../pages/Dashboards/AdminDashBoard/Products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "all-products", Component: AllProducts },
      { path: "product-details/:id", Component: ProductDetails },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      { path: "manage-users", Component: ManageUsers },
      { path: "all-products", Component: Products },
    ],
  },
]);
