import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const AboutUs = () => {
  return (
    <section className="mt-10 md:mt-20 px-4 md:px-10 lg:px-20 pb-10">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          About Us
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We provide a complete garments order tracking system to manage orders,
          production, inventory, and delivery from one dashboard.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Text */}
        <motion.div variants={fadeUp}>
          <h2
            class
            Name="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4"
          >
            Who We Are
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Our system helps garments factories and managers keep all production
            updates organized in real-time. From placing orders to dispatching
            finished products, all operations are handled smoothly.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            With automation and transparency, we aim to reduce manual workload,
            minimize errors, and streamline the complete workflow.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <img
            className="rounded-xl shadow-xl w-full md:w-4/5"
            src="./garments-factory.avif"
            alt="Garments Factory"
          />
        </motion.div>
      </motion.div>

      {/* Mission / Vision Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      >
        <motion.div
          variants={fadeUp}
          className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            📦 Our Mission
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            To help garments industries manage orders and production more
            efficiently with smart tracking tools.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            👕 Our Vision
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            To become the most reliable digital solution for the apparel
            manufacturing ecosystem.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            🚀 Our Goal
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Simplify production tracking and deliver seamless experiences to
            factory managers, buyers, and workers.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
