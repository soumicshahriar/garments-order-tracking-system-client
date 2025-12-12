import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

const ShippingPolicy = () => {
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
        Shipping Policy
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white leading-relaxed mb-5"
      >
        Please read our shipping policy carefully to understand how your orders
        are processed, delivered, and handled. We aim to provide fast, reliable,
        and smooth delivery for all customers.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-semibold text-white mt-8 mb-3"
      >
        Order Processing Time
      </motion.h2>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="list-disc pl-6 text-white mb-5 space-y-2"
      >
        <li>Orders are processed within 1–3 business days.</li>
        <li>
          Orders placed on weekends or holidays will be processed the next
          business day.
        </li>
        <li>Some customized items may require additional processing time.</li>
      </motion.ul>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl font-semibold text-white mt-8 mb-3"
      >
        Shipping Methods & Delivery Time
      </motion.h2>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="list-disc pl-6 text-white mb-5 space-y-2"
      >
        <li>Standard Delivery: 3–7 business days.</li>
        <li>Express Delivery: 1–3 business days.</li>
        <li>International Shipping: 7–15 business days.</li>
      </motion.ul>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xl font-semibold text-white mt-8 mb-3"
      >
        Shipping Charges
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-white leading-relaxed mb-5"
      >
        Shipping fees vary based on your location, order weight, and selected
        delivery method. You will see the calculated shipping cost before
        checkout.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xl font-semibold text-white mt-8 mb-3"
      >
        Order Tracking
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-white leading-relaxed mb-5"
      >
        Once your order is shipped, you will receive a tracking number via email
        or SMS. You can use this number to track your order in real time.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-white mt-6"
      >
        If you have any questions about our shipping process, feel free to
        contact our support team anytime.
      </motion.p>
    </motion.div>
  );
};

export default ShippingPolicy;
