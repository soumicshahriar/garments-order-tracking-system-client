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
import MyProfile from "../pages/Dashboards/MyProfile/MyProfile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AdminDashboard from "../pages/Dashboards/AdminDashBoard/AdminDashboard";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactInfo from "../pages/ContactInfo/ContactInfo";
import AdminRoute from "./AdminRoute/AdminRoute";
import ManagerRoute from "./ManagerRoute/ManagerRoute";
import PrivacyPolicy from "../pages/Policy/PrivacyPolicy";
import TermsCondition from "../pages/Policy/TermsCondition";
import RefundPolicy from "../pages/Policy/RefundPolicy";
import ShippingPolicy from "../pages/Policy/ShippingPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "all-products", Component: AllProducts },
      { path: "about-us", Component: AboutUs },
      { path: "contact-info", Component: ContactInfo },
      { path: "product-details/:id", Component: ProductDetails },
      {
        path: "order-form/:id",
        element: (
          <PrivateRoute>
            <OrderForm></OrderForm>
          </PrivateRoute>
        ),
      },
      { path: "register", Component: Register },
      { path: "login", Component: Login },

      // policy related route
      { path: "privacy", Component: PrivacyPolicy },
      { path: "terms", Component: TermsCondition },
      { path: "refund", Component: RefundPolicy },
      { path: "shipping", Component: ShippingPolicy },
    ],
  },

  // dashboard route
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // admin route

      { path: "admin-dashboard", Component: AdminDashboard },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <Products></Products>
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrders></AllOrders>
          </AdminRoute>
        ),
      },
      {
        path: "order-details/:orderId",
        element: (
          <AdminRoute>
            <OrderDetails></OrderDetails>
          </AdminRoute>
        ),
      },

      // manager dashboard
      {
        path: "add-product",
        element: (
          <ManagerRoute>
            <AddProduct></AddProduct>
          </ManagerRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ManagerRoute>
            <ManageProducts></ManageProducts>
          </ManagerRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerRoute>
            <PendingOrders></PendingOrders>
          </ManagerRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <ManagerRoute>
            <ApproveOrders></ApproveOrders>
          </ManagerRoute>
        ),
      },

      // buyer route
      { path: "my-orders", Component: MyOrders },
      { path: "track-order/:orderId", Component: TrackOrders },
      { path: "payment-success", Component: PaymentSuccess },

      // common profile
      { path: "profile", Component: MyProfile },
    ],
  },

  // error for all pages
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
