import { MdInventory, MdManageAccounts } from "react-icons/md";
import { Link, Outlet } from "react-router";
import {
  HiOutlineCheckCircle,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi";
import { AiOutlineOrderedList } from "react-icons/ai";
import {
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiPlusSquare,
} from "react-icons/fi";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  // console.log(role);
  //
  return (
    <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900  min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* Dashboard Top Navbar */}
        <div className="drawer-content">
          <nav className="navbar w-full bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 shadow-xl">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-gray-300 hover:text-cyan-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 text-lg font-semibold text-cyan-400">
              Dashboard
            </div>
          </nav>
          <div className="">
            <Outlet />
          </div>
        </div>

        {/* Dashboard Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col items-start bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 shadow-xl border-r-2 border-r-cyan-900 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow">
              {/* Home */}
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60"
                  data-tip="Homepage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5 text-cyan-400"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>
              {/* admin route */}
              {role === "admin" && (
                <>
                  {/* manage users */}
                  <li>
                    <Link
                      to={"/dashboard/manage-users"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="Manage Users"
                    >
                      <MdManageAccounts className="text-cyan-400" size={20} />
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </Link>
                  </li>

                  {/* all products */}
                  <li>
                    <Link
                      to={"/dashboard/all-products"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="All Products"
                    >
                      <MdInventory className="text-cyan-400" size={20} />
                      <span className="is-drawer-close:hidden">
                        All Products
                      </span>
                    </Link>
                  </li>

                  {/* all Orders */}
                  <li>
                    <Link
                      to={"/dashboard/all-orders"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="All Orders"
                    >
                      <AiOutlineOrderedList
                        className="text-cyan-400"
                        size={20}
                      />
                      <span className="is-drawer-close:hidden">All Orders</span>
                    </Link>
                  </li>
                </>
              )}

              {/* Manager route */}

              {role === "manager" && (
                <>
                  {/* add product */}
                  <li>
                    <Link
                      to={"/dashboard/add-product"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="Add Product"
                    >
                      <FiPlusSquare className="text-cyan-400" size={20} />
                      <span className="is-drawer-close:hidden">
                        Add Product
                      </span>
                    </Link>
                  </li>
                  {/* manage products */}
                  <li>
                    <Link
                      to={"/dashboard/manage-products"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="Manage Products"
                    >
                      <FiPackage className="text-cyan-400" size={20} />
                      <span className="is-drawer-close:hidden">
                        Manage Products
                      </span>
                    </Link>
                  </li>
                  {/* Pending Orders */}
                  <li>
                    <Link
                      to={"/dashboard/pending-orders"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="Pending Orders"
                    >
                      <FiClock className="text-cyan-400" size={20} />
                      <span className="is-drawer-close:hidden">
                        Pending Orders
                      </span>
                    </Link>
                  </li>
                  {/* approved Orders */}
                  <li>
                    <Link
                      to={"/dashboard/approved-orders"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="Approved Orders"
                    >
                      <FiCheckCircle className="text-green-400" size={20} />
                      <span className="is-drawer-close:hidden">
                        Approved Orders
                      </span>
                    </Link>
                  </li>
                </>
              )}

              {/* buyer route */}
              {role === "buyer" && (
                <>
                  {/* my orders */}
                  <li>
                    <Link
                      to={"/dashboard/my-orders"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="My Orders"
                    >
                      <HiOutlineShoppingBag
                        className="text-cyan-400"
                        size={20}
                      />
                      <span className="is-drawer-close:hidden">My Orders</span>
                    </Link>
                  </li>

                  {/* payment success */}
                  <li>
                    <Link
                      to={"/dashboard/payment-success"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                      data-tip="Payment Success"
                    >
                      <HiOutlineCheckCircle
                        className="text-cyan-400"
                        size={20}
                      />
                      <span className="is-drawer-close:hidden">
                        Payment Success
                      </span>
                    </Link>
                  </li>
                </>
              )}

              {/* profile */}
              <li>
                <Link
                  to={"/dashboard/profile"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60 flex items-center gap-2"
                  data-tip="Profile"
                >
                  <HiOutlineUser className="text-blue-400" size={20} />
                  <span className="is-drawer-close:hidden">Profile</span>
                </Link>
              </li>

              {/* setting */}
              {/* <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gray-800/60"
                  data-tip="Settings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5 text-cyan-400"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
