import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdHome, MdContactMail } from "react-icons/md";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  console.log("user", user);
  const navigate = useNavigate();
  const { role } = useRole();
  console.log(role);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { label: "Home", href: "/", icon: MdHome },
    { label: "All Product", href: "/all-products", icon: BiSolidShoppingBags },
    { label: "About Us", href: "/about", icon: FaShoppingBag },
    { label: "Contact", href: "/contact", icon: MdContactMail },
    user &&
      role === "admin" && {
        label: "Dashboard",
        href: "/dashboard/admin-dashboard",
        icon: MdDashboard,
      },
    user &&
      role === "manager" && {
        label: "Dashboard",
        href: "/dashboard/manage-products",
        icon: MdDashboard,
      },
    user &&
      role === "buyer" && {
        label: "Dashboard",
        href: "/dashboard/my-orders",
        icon: MdDashboard,
      },
  ].filter(Boolean);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
        navigate("/");
        window.location.reload();
      })
      .catch(() => {
        toast.error("log out failed");
      });
  };

  return (
    <nav className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl sticky top-0 z-50 max-w-7xl mx-auto rounded">
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <div className="shrink-0">
            <a href="/" className="flex items-center group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-linear-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm sm:text-lg lg:text-xl">
                  GO
                </span>
              </div>
              <span className="hidden sm:block ml-2 sm:ml-3 text-sm sm:text-lg lg:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 whitespace-nowrap">
                Garments Order
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <NavLink
                  key={link.label}
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 md:space-x-2 text-xs md:text-sm lg:text-base transition-colors duration-300 font-medium relative group ${
                      isActive ? "text-cyan-400 font-semibold" : "text-gray-300"
                    }`
                  }
                >
                  <IconComponent className="text-sm md:text-base lg:text-lg shrink-0" />
                  <span className="hidden lg:inline">{link.label}</span>
                  <span className="inline lg:hidden" title={link.label}>
                    {link.label.split(" ")[0]}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              );
            })}
          </div>

          {/* Right Side - Auth & User */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 lg:space-x-3 pl-2 lg:pl-4 border-l border-gray-700">
                  {/* <FaUserCircle  /> */}
                  <img
                    src={user.photoURL}
                    className="text-cyan-400 text-xl w-10 h-10 rounded-full md:text-2xl lg:text-3xl cursor-pointer hover:text-blue-400 transition-colors duration-300"
                    alt="user-photo"
                  />
                  <button
                    onClick={handleLogOut}
                    className="hidden md:flex items-center space-x-2 px-3 lg:px-4 py-1 lg:py-2 bg-red-600 hover:bg-red-700 text-white text-xs lg:text-sm rounded-lg font-medium transition-colors duration-300 transform hover:scale-105"
                  >
                    <FaSignOutAlt className="text-sm lg:text-lg " />
                    <span className="md:hidden lg:flex">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-3 py-1 md:px-4 md:py-1.5 lg:px-5 lg:py-2 text-cyan-400 border-2 border-cyan-400 rounded-lg text-xs md:text-xs lg:text-sm font-medium hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                >
                  <FiLogIn className="text-xs md:text-sm lg:text-lg shrink-0" />
                  <span className="hidden lg:inline">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-3 py-1 md:px-4 md:py-1.5 lg:px-5 lg:py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-xs md:text-xs lg:text-sm rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <IoPersonAddSharp className="text-xs md:text-sm lg:text-lg shrink-0" />
                  <span className="hidden lg:inline">Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
            {user ? (
              // <FaUserCircle className="text-cyan-400 text-lg sm:text-2xl cursor-pointer hover:text-blue-400 transition-colors duration-300" />
              <img
                src={user.photoURL}
                className="text-cyan-400 text-xl w-10 h-10 rounded-full md:text-2xl lg:text-3xl cursor-pointer hover:text-blue-400 transition-colors duration-300"
                alt="user-photo"
              />
            ) : null}
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg sm:text-2xl"
            >
              {isOpen ? (
                <AiOutlineClose className="text-lg sm:text-2xl" />
              ) : (
                <GiHamburgerMenu className="text-lg sm:text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-3 sm:pb-4 border-t border-gray-700 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    key={link.label}
                    to={link.href}
                    end={link.href === "/"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base transition-all duration-300 font-medium rounded-lg ${
                        isActive
                          ? "text-cyan-400 bg-gray-800/50"
                          : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                      }`
                    }
                  >
                    <IconComponent className="text-base sm:text-lg shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}

              {/* Mobile Auth Buttons */}
              <div className="pt-3 sm:pt-4 border-t border-gray-700 space-y-2">
                {user ? (
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base rounded-lg font-medium transition-colors duration-300"
                  >
                    <FaSignOutAlt className="text-base sm:text-lg" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-cyan-400 border-2 border-cyan-400 rounded-lg text-sm sm:text-base font-medium hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
                    >
                      <FiLogIn className="text-base sm:text-lg" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-sm sm:text-base rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                    >
                      <IoPersonAddSharp className="text-base sm:text-lg" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
