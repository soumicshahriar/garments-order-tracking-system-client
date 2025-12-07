import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const OrderForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  // ============================
  //  Fetch Product by ID
  // ============================
  const { data: product = [], isPending } = useQuery({
    queryKey: ["single-product", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/single-products/${id}`);
      return res.data;
    },
  });

  // ============================
  // React Hook Form Setup
  // ============================
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // ----------------------------
  // Quantity state
  // ----------------------------
  const [quantity, setQuantity] = useState(0);

  // Set initial quantity when product loads
  useEffect(() => {
    if (product?.minimumOrderQuantity) {
      setQuantity(product.minimumOrderQuantity);
    }
  }, [product]);

  // Total Price Calculation
  const price = product?.price || 0;
  const totalPrice = price * quantity;

  // Quantity Handler
  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);

    if (
      value >= product.minimumOrderQuantity &&
      value <= product.availableQuantity
    ) {
      setQuantity(value);
    }
  };

  // ============================
  // Submit Order
  // ============================
  const onSubmit = async (data) => {
    const orderInfo = {
      ...data,
      quantity,
      totalPrice,
      buyerEmail: user?.email,
      paymentMethod: product.paymentOption[0],
      productId: product._id,
      productTitle: product.title,
    };
    console.log(orderInfo);

    const res = await axiosInstance.post("/orders", orderInfo);
    console.log(res.data);
    if (res.data.paymentRequired) {
      const sessionRes = await axiosInstance.post("/create-payment-session", {
        orderId: res.data.orderId,
      });

      // Redirect to Stripe Checkout
      window.location.assign(sessionRes.data.url);
      return;
    } else {
      // no payment--> order completed
      navigate("/dashboard/my-orders");
    }
  };

  if (isPending) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto  bg-gray-900 text-white rounded border p-4">
        <h2 className="text-2xl font-bold mb-6">Place Your Order</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              readOnly
              value={user?.email}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>

          {/* Product Title */}
          <div>
            <label className="block mb-1 font-medium">Product Title</label>
            <input
              type="text"
              readOnly
              defaultValue={product?.title}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              readOnly
              defaultValue={product?.price}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>

          {/* Quantity */}
          <div>
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
          </div>

          {/* Total Price */}
          <div>
            <label className="block mb-1 font-medium">Total Price</label>
            <input
              type="number"
              readOnly
              value={totalPrice}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              {...register("firstName", { required: true })}
              className="w-full p-2 rounded bg-gray-800"
            />
            {errors.firstName && (
              <p className="text-red-400">First name is required</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              {...register("lastName", { required: true })}
              className="w-full p-2 rounded bg-gray-800"
            />
            {errors.lastName && (
              <p className="text-red-400">Last name is required</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block mb-1 font-medium">Contact Number</label>
            <input
              {...register("contact", { required: true })}
              className="w-full p-2 rounded bg-gray-800"
            />
            {errors.contact && (
              <p className="text-red-400">Contact number is required</p>
            )}
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block mb-1 font-medium">Delivery Address</label>
            <textarea
              {...register("address", { required: true })}
              className="w-full p-2 rounded bg-gray-800"
            ></textarea>
            {errors.address && (
              <p className="text-red-400">Address is required</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 duration-300"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
