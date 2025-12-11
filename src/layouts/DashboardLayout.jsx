import {
  MdInventory,
  MdManageAccounts,
  MdSpaceDashboard,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router";
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
import useTitle from "../hooks/useTitle";

const DashboardLayout = () => {
  useTitle("Dashboard");
  const { role } = useRole();

  const activeClass =
    "border-l-4 border-cyan-400 bg-gray-800/60 text-cyan-400 font-semibold";

  return (
    <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
                viewBox="0 0 24 24"
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

        {/* Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <div className="flex min-h-full flex-col items-start bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 shadow-xl border-r-2 border-r-cyan-900 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow">
              {/* Homepage */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 hover:bg-gray-800/60 ${
                      isActive ? activeClass : ""
                    }`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5 text-cyan-400"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </NavLink>
              </li>

              {/* Admin Routes */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/admin-dashboard"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <MdSpaceDashboard size={20} className="text-cyan-400" />
                      <span className="is-drawer-close:hidden">
                        Admin Dashboard
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-users"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <MdManageAccounts size={20} className="text-cyan-400" />
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/all-products"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <MdInventory size={20} className="text-cyan-400" />
                      <span className="is-drawer-close:hidden">
                        All Products
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/all-orders"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <AiOutlineOrderedList
                        size={20}
                        className="text-cyan-400"
                      />
                      <span className="is-drawer-close:hidden">All Orders</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Manager Routes */}
              {role === "manager" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/add-product"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <FiPlusSquare size={20} className="text-cyan-400" />
                      <span className="is-drawer-close:hidden">
                        Add Product
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-products"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <FiPackage size={20} className="text-cyan-400" />
                      <span className="is-drawer-close:hidden">
                        Manage Products
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/pending-orders"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <FiClock size={20} className="text-cyan-400" />
                      <span className="is-drawer-close:hidden">
                        Pending Orders
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/approved-orders"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <FiCheckCircle size={20} className="text-green-400" />
                      <span className="is-drawer-close:hidden">
                        Approved Orders
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Buyer Routes */}
              {role === "buyer" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-orders"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <HiOutlineShoppingBag
                        size={20}
                        className="text-cyan-400"
                      />
                      <span className="is-drawer-close:hidden">My Orders</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/payment-success"
                      className={({ isActive }) =>
                        `flex items-center gap-2 hover:bg-gray-800/60 ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      <HiOutlineCheckCircle
                        size={20}
                        className="text-cyan-400"
                      />
                      <span className="is-drawer-close:hidden">
                        Payment Success
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Profile */}
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 hover:bg-gray-800/60 ${
                      isActive ? activeClass : ""
                    }`
                  }
                >
                  <HiOutlineUser size={20} className="text-blue-400" />
                  <span className="is-drawer-close:hidden">Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
