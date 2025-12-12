import { Link } from "react-router";
import AppLogo from "../../AppLogo/AppLogo";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";

const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay (1 sec)
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <footer className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-10 mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo / Name / Description */}
        <div>
          <h1 className="text-2xl font-bold text-cyan-400 drop-shadow-md">
            <AppLogo></AppLogo>
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Premium products, high quality service, and seamless shopping
            experience—crafted just for you.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">
            Useful Links
          </h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-products"
                className="hover:text-cyan-400 transition"
              >
                Products
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-cyan-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact-info"
                className="hover:text-cyan-400 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Policies</h2>
          <ul className="space-y-2">
            <li>
              <a href="/privacy" className="hover:text-cyan-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-cyan-400 transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/refund" className="hover:text-cyan-400 transition">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-cyan-400 transition">
                Shipping Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
          <p className="text-sm">Email: support@yourwebsite.com</p>
          <p className="text-sm mt-1">Phone: +880 1234-567890</p>
          <p className="text-sm mt-1">Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} YourWebsite — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
