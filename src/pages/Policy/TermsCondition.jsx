import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

const TermsCondition = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay (1 sec)
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 mt-10 text-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Terms & Conditions
      </motion.h1>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {/* Section 1 */}
        <motion.div
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-400">
            By accessing or using our platform, you agree to comply with these
            Terms & Conditions. If you do not agree, you must discontinue using
            the service immediately.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            2. User Responsibilities
          </h2>
          <p className="text-gray-400">
            Users must provide accurate information, maintain account security,
            and refrain from misusing the platform or engaging in prohibited
            activities.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Orders & Transactions
          </h2>
          <p className="text-gray-400">
            All orders are subject to verification and may be rejected if they
            violate guidelines or appear fraudulent. Users must ensure accurate
            data before placing orders.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Intellectual Property Rights
          </h2>
          <p className="text-gray-400">
            All logos, designs, and content on this platform are protected by
            copyright laws. Unauthorized reproduction or redistribution is
            strictly prohibited.
          </p>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-400">
            We are not responsible for damages arising from misuse, third-party
            actions, or interruptions in service. Use the platform at your own
            risk.
          </p>
        </motion.div>

        {/* Section 6 */}
        <motion.div
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Changes to Terms
          </h2>
          <p className="text-gray-400">
            We reserve the right to update these Terms & Conditions at any time.
            Continued use of the service indicates acceptance of any changes.
          </p>
        </motion.div>

        {/* Section 7 */}
        <motion.div
          className="bg-gray-900/60 p-6 rounded-lg border border-white/10 shadow-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-white mb-2">7. Contact</h2>
          <p className="text-gray-400">
            For any questions regarding these terms, feel free to reach us at
            our official contact channels.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TermsCondition;
