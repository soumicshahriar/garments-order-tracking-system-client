import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const ContactInfo = () => {
  return (
    <section className="mt-10 md:mt-20 px-4 md:px-10 lg:px-20 pb-2">
      {/* HEADER */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Reach out to us anytime — we’re here to help with your garments order
          tracking system.
        </p>
      </motion.div>

      {/* MAIN CONTENT */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* LEFT SIDE – IMAGE */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <img
            src="./contact.avif" // 💡 Replace with your public folder image
            alt="Contact"
            className="rounded-xl shadow-xl w-full md:w-4/5"
          />
        </motion.div>

        {/* RIGHT SIDE – CONTACT DETAILS */}
        <motion.div variants={fadeUp}>
          <div className="grid grid-cols-1 gap-6">
            {/* Email */}
            <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700 flex items-start gap-4">
              <FiMail size={28} className="text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  support@garmentsystem.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700 flex items-start gap-4">
              <FiPhone size={28} className="text-green-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Phone
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  +880 1234-567890
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700 flex items-start gap-4">
              <FiMapPin size={28} className="text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Office Location
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Uttara Sector 10, Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700 flex items-start gap-4">
              <FiClock size={28} className="text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Working Hours
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sat – Thu: 10:00 AM – 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* MAP */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-16"
      >
        {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Location
        </h2>

        <div className="rounded-xl overflow-hidden shadow-xl h-64 md:h-96">
          <iframe
            title="map"
            width="100%"
            height="100%"
            frameBorder="0"
            className="border-0"
            src="https://maps.google.com/maps?q=Uttara%20Sector%2010&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
          ></iframe>
        </div> */}
      </motion.div>
    </section>
  );
};

export default ContactInfo;
