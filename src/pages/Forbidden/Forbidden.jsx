import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-900">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-white"
      >
        {/* 403 Text Animation */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-7xl font-extrabold mb-4"
        >
          403
        </motion.h1>

        {/* Forbidden Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-300 max-w-md mx-auto mb-8"
        >
          Access Denied — You don’t have permission to view this page.
        </motion.p>

        {/* Floating Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-5xl mb-8"
        >
          🚫
        </motion.div>

        {/* Back Home Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}>
          <Link
            to="/"
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Forbidden;
