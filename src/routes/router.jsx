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
import AddProduct from "../pages/Dashboards/ManagerDashBoard/AddProduct/AddProduct";
import ManageProducts from "../pages/Dashboards/ManagerDashBoard/ManageProducts/ManageProducts";
import PendingOrders from "../pages/Dashboards/ManagerDashBoard/PendingOrders/PendingOrders";
import ApproveOrders from "../pages/Dashboards/ManagerDashBoard/ApproveOrders/ApproveOrders";
import TrackOrders from "../pages/Dashboards/BuyerDashBoard/TrackOrders/TrackOrders";
import OrderDetails from "../pages/Dashboards/AdminDashBoard/OrderDetails/OrderDetails";

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
      { path: "order-details/:orderId", Component: OrderDetails },

      // manager dashboard
      { path: "add-product", Component: AddProduct },
      { path: "manage-products", Component: ManageProducts },
      { path: "pending-orders", Component: PendingOrders },
      { path: "approved-orders", Component: ApproveOrders },

      // buyer route
      { path: "my-orders", Component: MyOrders },
      { path: "track-order/:orderId", Component: TrackOrders },
      { path: "payment-success", Component: PaymentSuccess },
    ],
  },
]);
