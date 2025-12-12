import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import useTitle from "../../hooks/useTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProductDetails = () => {
  useTitle("Product Details");
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const userObj = userData[0] || {};

  const { data: product = [], error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Error loading product details
      </div>
    );
  if (!product._id)
    return (
      <div className="text-center text-red-500 py-10">Product not found</div>
    );

  const images = product.images || [product.image];
  const currentImage = images[selectedImage] || product.image;

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4 mt-10 md:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* Images Section */}
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Main Image */}
        <motion.div
          className="rounded-xl overflow-hidden shadow-lg bg-gray-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {product.demoVideo ? (
            <motion.iframe
              className="w-full h-64 md:h-80 lg:h-96 rounded-xl"
              src={product.demoVideo}
              title="Product Demo"
              frameBorder="0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></motion.iframe>
          ) : (
            <motion.img
              src={currentImage}
              alt={product.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl"
              whileHover={{ scale: 1.03 }}
            />
          )}
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <motion.div
            className="flex gap-3 overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Thumbnail"
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                  selectedImage === index
                    ? "border-cyan-400"
                    : "border-gray-700"
                }`}
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Info Section */}
      <motion.div
        className="space-y-5 text-gray-200"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <motion.h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
          {product.title}
        </motion.h1>

        <motion.p className="text-lg">
          <span className="font-semibold text-gray-400">Category:</span>{" "}
          {product.category}
        </motion.p>

        <motion.div className="bg-gray-900/40 p-4 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p className="text-gray-300">{product.description}</p>
        </motion.div>

        {/* Grid Info */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 p-4 rounded-xl">
            <p className="text-gray-400">Price</p>
            <p className="text-xl font-semibold text-cyan-300">
              ${product.price}
            </p>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-xl">
            <p className="text-gray-400">Available</p>
            <p className="text-xl font-semibold">
              {product.availableQuantity} units
            </p>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-xl">
            <p className="text-gray-400">Min Order</p>
            <p className="text-xl font-semibold">
              {product.minimumOrderQuantity} units
            </p>
          </div>
        </motion.div>

        {/* Payment Options */}
        {product.paymentOption && product.paymentOption.length > 0 && (
          <motion.div className="bg-gray-900/50 p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Payment Options</h3>
            <p>{product.paymentOption}</p>
          </motion.div>
        )}

        {/* Order Button */}
        {userObj?.role === "buyer" && (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to={`/order-form/${product._id}`}
              className={`block text-center py-3 rounded-xl font-semibold text-white ${
                product.availableQuantity < product.minimumOrderQuantity
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-linear-to-r from-cyan-500 to-blue-600 hover:shadow-lg"
              }`}
            >
              Order Now
            </Link>
          </motion.div>
        )}

        {/* Out of Stock */}
        {product.availableQuantity < product.minimumOrderQuantity && (
          <motion.p className="text-red-400 font-semibold">
            Out of Stock
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
