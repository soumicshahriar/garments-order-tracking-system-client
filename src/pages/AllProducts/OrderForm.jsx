import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import useSuspend from "../../hooks/useSuspend";

// 🆕 Framer Motion Import
import { motion } from "motion/react";

const OrderForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { status } = useSuspend();

  const { data: product = [], isLoading } = useQuery({
    queryKey: ["single-product", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/single-products/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product?.minimumOrderQuantity) {
      setQuantity(product.minimumOrderQuantity);
    }
  }, [product]);

  const price = product?.price || 0;
  const totalPrice = price * quantity;

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (
      value >= product.minimumOrderQuantity &&
      value <= product.availableQuantity
    ) {
      setQuantity(value);
    }
  };

  const onSubmit = async (data) => {
    const orderInfo = {
      ...data,
      quantity,
      totalPrice,
      buyerEmail: user?.email,
      paymentMethod: product.paymentOption,
      productId: product._id,
      productTitle: product.title,
    };

    const res = await axiosInstance.post("/orders", orderInfo);

    if (res.data.paymentRequired) {
      const sessionRes = await axiosInstance.post("/create-payment-session", {
        orderId: res.data.orderId,
      });

      window.location.assign(sessionRes.data.url);
      return;
    } else {
      navigate("/dashboard/my-orders");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  // --------------------------
  // Framer motion variants
  // --------------------------
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-2xl mx-auto bg-gray-900 text-white rounded border p-4 mt-5"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
        Place Your Order
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        variants={containerVariants}
      >
        {/* Email */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            readOnly
            value={user?.email}
            className="w-full p-2 rounded bg-gray-800"
          />
        </motion.div>

        {/* Product Title */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">Product Title</label>
          <input
            type="text"
            readOnly
            defaultValue={product?.title}
            className="w-full p-2 rounded bg-gray-800"
          />
        </motion.div>

        {/* Price */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            readOnly
            defaultValue={product?.price}
            className="w-full p-2 rounded bg-gray-800"
          />
        </motion.div>

        {/* Quantity */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">Order Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full p-2 rounded bg-gray-800"
            min={product.minimumOrderQuantity}
            max={product.availableQuantity}
          />
          <p className="text-sm text-gray-400">
            Min: {product.minimumOrderQuantity} — Max:{" "}
            {product.availableQuantity}
          </p>
        </motion.div>

        {/* Total Price */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">Total Price</label>
          <input
            type="number"
            readOnly
            value={totalPrice}
            className="w-full p-2 rounded bg-gray-800"
          />
        </motion.div>

        {/* First Name */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            {...register("firstName", { required: true })}
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.firstName && (
            <p className="text-red-400">First name is required</p>
          )}
        </motion.div>

        {/* Last Name */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            {...register("lastName", { required: true })}
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.lastName && (
            <p className="text-red-400">Last name is required</p>
          )}
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            {...register("contact", { required: true })}
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.contact && (
            <p className="text-red-400">Contact number is required</p>
          )}
        </motion.div>

        {/* Address */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 font-medium">Delivery Address</label>
          <textarea
            {...register("address", { required: true })}
            className="w-full p-2 rounded bg-gray-800"
          ></textarea>
          {errors.address && (
            <p className="text-red-400">Address is required</p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          {status === "suspended" ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full py-2 bg-gray-600 rounded"
              disabled
            >
              You Are Suspended
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 duration-300"
            >
              Confirm Order
            </motion.button>
          )}
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default OrderForm;
