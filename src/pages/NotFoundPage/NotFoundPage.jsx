import { motion } from "framer-motion";
import { Link } from "react-router";
import useTitle from "../../hooks/useTitle";

const NotFoundPage = () => {
  useTitle("Not Found");
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 text-center">
      {/* 404 Number */}
      <motion.h1
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-9xl font-extrabold text-blue-500 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-4 text-xl md:text-2xl text-gray-300"
      >
        Oops! The page you are looking for does not exist.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
        >
          Go Home
        </Link>
      </motion.div>

      {/* Floating animation element */}
      <motion.div
        className="absolute bottom-10 text-gray-500 text-sm"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Lost? Let’s get you back!
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
