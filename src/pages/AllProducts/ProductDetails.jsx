import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import "./ProductDetails.css";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProductDetails = () => {
  const { user } = useAuth();

  const axiosInstance = useAxios();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // get user by email
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
  if (error) return <div className="error">Error loading product details</div>;
  if (!product._id) return <div className="error">Product not found</div>;

  const images = product.images || [product.image];
  const currentImage = images[selectedImage] || product.image;

  return (
    <motion.div
      className="product-details-container"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* Product Images Section */}
      <motion.div
        className="product-images-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Main Image */}
        <motion.div
          className="main-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {product.demoVideo ? (
            <motion.iframe
              width="100%"
              height="400"
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
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <motion.div
            className="image-thumbnails"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`${product.title}-${index}`}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Product Information Section */}
      <motion.div
        className="product-info-section"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Product Title */}
        <motion.h1
          className="product-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {product.title}
        </motion.h1>

        {/* Category */}
        <motion.p
          className="product-category"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="label">Category:</span> {product.category}
        </motion.p>

        {/* Description */}
        <motion.div
          className="product-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Description</h3>
          <p>{product.description}</p>
        </motion.div>

        {/* Details Grid */}
        <motion.div
          className="product-details-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="detail-item">
            <span className="detail-label">Price</span>
            <span className="detail-value price">${product.price}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Available Quantity</span>
            <span className="detail-value">
              {product.availableQuantity} units
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Minimum Order</span>
            <span className="detail-value">
              {product.minimumOrderQuantity} units
            </span>
          </div>
        </motion.div>

        {/* Payment Options */}
        {product.paymentOption && product.paymentOption.length > 0 && (
          <motion.div
            className="payment-options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Payment Options</h3>
            <ul className="payment-list">{product.paymentOption}</ul>
          </motion.div>
        )}

        {/* Order Button */}
        {userObj?.role === "buyer" && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to={`/order-form/${product._id}`}
              className="order-button text-center"
              disabled={
                product.availableQuantity < product.minimumOrderQuantity
              }
            >
              Order Now
            </Link>
          </motion.div>
        )}

        {product.availableQuantity < product.minimumOrderQuantity && (
          <motion.p
            className="out-of-stock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Out of Stock
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
