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
import OrderForm from "../pages/AllProducts/OrderForm";
import MyOrders from "../pages/Dashboards/BuyerDashBoard/MyOrders/MyOrders";
import PaymentSuccess from "../pages/Dashboards/BuyerDashBoard/MyOrders/PaymentSuccess";
import AllOrders from "../pages/Dashboards/AdminDashBoard/AllOrders/AllOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "all-products", Component: AllProducts },
      { path: "product-details/:id", Component: ProductDetails },
      { path: "order-form/:id", Component: OrderForm },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      // admin route
      { path: "manage-users", Component: ManageUsers },
      { path: "all-products", Component: Products },
      { path: "all-orders", Component: AllOrders },

      // buyer route
      { path: "my-orders", Component: MyOrders },
      { path: "payment-success", Component: PaymentSuccess },
    ],
  },
]);
