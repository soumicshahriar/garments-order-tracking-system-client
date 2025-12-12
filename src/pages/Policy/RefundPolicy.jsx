import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

const RefundPolicy = () => {
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto px-6 pt-12"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6 text-white"
      >
        Refund Policy
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white leading-relaxed mb-5"
      >
        Thank you for choosing our service. We strive to ensure the best
        experience for our customers. Please read the refund policy carefully
        before requesting any refund.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-semibold text-white mt-8 mb-3"
      >
        Refund Eligibility
      </motion.h2>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="list-disc pl-6 text-white mb-5 space-y-2"
      >
        <li>The product/service must be unused or not delivered.</li>
        <li>
          Refund requests must be submitted within 7 days of the purchase date.
        </li>
        <li>Proof of purchase must be provided for verification purposes.</li>
      </motion.ul>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl font-semibold text-white mt-8 mb-3"
      >
        Non-Refundable Situations
      </motion.h2>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="list-disc pl-6 text-white mb-5 space-y-2"
      >
        <li>Products that have already been processed or delivered.</li>
        <li>Customized orders cannot be refunded.</li>
        <li>Any service already consumed or used.</li>
      </motion.ul>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xl font-semibold text-white mt-8 mb-3"
      >
        How to Request a Refund
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-white leading-relaxed mb-5"
      >
        To request a refund, please contact our support team with your order
        details and the reason for the refund request. Our team will review your
        case and respond within 2–3 business days.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-white mt-6"
      >
        If you have any questions regarding our refund policy, feel free to
        reach out anytime.
      </motion.p>
    </motion.div>
  );
};

export default RefundPolicy;
