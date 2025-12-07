import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import "./ProductDetails.css";
import useAuth from "../../hooks/useAuth";

const ProductDetails = () => {
  const { user } = useAuth();
  console.log(user);

  const axiosInstance = useAxios();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // get user by email
  const { data: userData = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  // console.log("user data", [userData]);
  const userObj = userData[0] || {};

  const {
    data: product = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-products/${id}`);
      return res.data;
    },
  });
  console.log(product);

  // const handleQuantityChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   if (value >= product.minimumOrder && value <= product.availableQuantity) {
  //     setQuantity(value);
  //   }
  // };

  // const handleIncrement = () => {
  //   if (quantity < product.availableQuantity) {
  //     setQuantity(quantity + 1);
  //   }
  // };

  // const handleDecrement = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  // const handleOrder = () => {
  //   console.log("Order placed:", {
  //     productId: product._id,
  //     productName: product.title,
  //     quantity,
  //     totalPrice: product.price * quantity,
  //   });
  //   // TODO: Implement order booking functionality
  //   alert(`Order placed for ${quantity} units of ${product?.title}`);
  // };

  if (isLoading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">Error loading product details</div>;
  }

  if (!product._id) {
    return <div className="error">Product not found</div>;
  }

  const images = product.images || [product.image];
  const currentImage = images[selectedImage] || product.image;

  return (
    <div className="product-details-container">
      {/* Product Images Section */}
      <div className="product-images-section">
        <div className="main-image">
          {product.demoVideo ? (
            <iframe
              width="100%"
              height="400"
              src={product.demoVideo}
              title="Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img src={currentImage} alt={product.title} />
          )}
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="image-thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title}-${index}`}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Information Section */}
      <div className="product-info-section">
        {/* Product Name */}
        <h1 className="product-title">{product.title}</h1>

        {/* Category */}
        <p className="product-category">
          <span className="label">Category:</span> {product.category}
        </p>

        {/* Description */}
        <div className="product-description">
          <h3>Description</h3>
          <p>{product.productDescription}</p>
        </div>

        {/* Product Details Grid */}
        <div className="product-details-grid">
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
        </div>

        {/* Payment Options */}
        {product.paymentOption && product.paymentOption.length > 0 && (
          <div className="payment-options">
            <h3>Payment Options</h3>
            <ul className="payment-list">
              {product?.paymentOption.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Quantity Selector */}
        {/* <div className="quantity-section">
          <label htmlFor="quantity" className="quantity-label">
            Select Quantity:
          </label>
          <div className="quantity-controls">
            <button
              className="qty-btn"
              // onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              −
            </button>
            <input
              id="quantity"
              type="number"
              value={quantity}
              // onChange={handleQuantityChange}
              min={product.minimumOrder}
              max={product.availableQuantity}
              className="quantity-input "
            />
            <button
              className="qty-btn"
              // onClick={handleIncrement}
              disabled={quantity >= product.availableQuantity}
            >
              +
            </button>
          </div>
          <p className="quantity-info">
            (Min: {product.minimumOrderQuantity} | Max:{" "}
            {product.availableQuantity})
          </p>
        </div> */}

        {/* Total Price */}
        {/* <div className="total-price">
          <span>Total Price:</span>
          <span className="price-value">${product.price * quantity}</span>
        </div> */}

        {/* Order Button */}
        {userObj?.role === "buyer" && (
          <Link
            to={`/order-form/${product._id}`}
            className="order-button text-center"
            // onClick={handleOrder}
            disabled={product.availableQuantity < product.minimumOrderQuantity}
          >
            Order Now
          </Link>
        )}

        {product.availableQuantity < product.minimumOrderQuantity && (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
