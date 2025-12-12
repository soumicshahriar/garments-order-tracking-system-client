import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay (1 sec)
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 mt-10 text-gray-300"
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6"
      >
        Privacy Policy
      </motion.h1>

      {/* Section Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="space-y-6"
      >
        {/* Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Introduction
          </h2>
          <p className="text-gray-400">
            We value your privacy and are committed to protecting your personal
            information. This Privacy Policy outlines how we collect, use, and
            safeguard your data.
          </p>
        </motion.div>

        {/* Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            2. Information We Collect
          </h2>
          <p className="text-gray-400">
            We collect personal information such as your name, email, and usage
            data to improve our services and provide a better experience.
          </p>
        </motion.div>

        {/* Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-400">
            We use your information to provide services, enhance user
            experience, and communicate updates or offers.
          </p>
        </motion.div>

        {/* Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Data Protection
          </h2>
          <p className="text-gray-400">
            We implement strong security measures to protect your information
            from unauthorized access, alteration, or disclosure.
          </p>
        </motion.div>

        {/* Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Contact Us
          </h2>
          <p className="text-gray-400">
            If you have any questions about this Privacy Policy, feel free to
            contact us anytime.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;
