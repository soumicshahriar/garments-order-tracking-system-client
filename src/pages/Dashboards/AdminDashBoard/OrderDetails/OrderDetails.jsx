import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import Loader from "../../../Loader/Loader";
import { motion } from "motion/react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const axiosInstance = useAxios();

  const { data: orderDetails = {}, isLoading } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/orders/${orderId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const timeline = orderDetails?.tracking || [];

  return (
    <div className="p-4 md:p-8 text-white">
      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6">Order Details</h2>

      {/* MAIN WRAPPER */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDE – ORDER & CUSTOMER INFO */}
        <div className="lg:col-span-2 space-y-6">
          {/* ORDER INFO CARD */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Order Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                {orderDetails._id}
              </p>
              <p>
                <span className="font-semibold">Tracking ID:</span>{" "}
                {orderDetails.trackingId}
              </p>
              <p>
                <span className="font-semibold">Product:</span>{" "}
                {orderDetails.productTitle}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {orderDetails.quantity}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {orderDetails.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(orderDetails.orderTime).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Approved At:</span>{" "}
                {orderDetails.approvedAt
                  ? new Date(orderDetails.approvedAt).toLocaleString()
                  : "Pending"}
              </p>
            </div>
          </div>

          {/* CUSTOMER INFO */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Customer Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {orderDetails.firstName} {orderDetails.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {orderDetails.buyerEmail}
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{" "}
                {orderDetails.contact}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {orderDetails.address}
              </p>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="p-6 rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <p className="text-lg">
              <span className="font-semibold">Total Price:</span> ৳
              {orderDetails.totalPrice}
            </p>
            <p>
              <span className="font-semibold">Order Status:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-lg text-sm ${
                  orderDetails.orderStatus === "Approved"
                    ? "bg-green-700"
                    : orderDetails.orderStatus === "Pending"
                    ? "bg-yellow-600"
                    : "bg-red-700"
                }`}
              >
                {orderDetails.orderStatus}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE – TRACKING TIMELINE */}
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Tracking History</h3>

          {/* Vertical Line */}
          <div className="relative ml-3">
            <div className="absolute left-2 top-0 w-1 h-full bg-blue-600 rounded-full opacity-40"></div>

            {/* TRACKING ITEMS */}
            <div className="space-y-8">
              {timeline.length === 0 && (
                <p className="text-gray-400 text-center mt-4">
                  No tracking updates yet.
                </p>
              )}

              {timeline.map((track, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="relative pl-10"
                >
                  {/* DOT */}
                  <motion.div
                    className={`w-4 h-4 rounded-full absolute left-[-2px] top-1 ${
                      i === timeline.length - 1
                        ? "bg-green-400 shadow-lg shadow-green-300"
                        : "bg-blue-400"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />

                  {/* CARD */}
                  <motion.div
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0px 0px 15px rgba(59,130,246,0.4)",
                    }}
                  >
                    <p className="text-blue-300 font-semibold">
                      {track.status}
                    </p>
                    <p className="text-sm">{track.location}</p>
                    <p className="text-xs text-gray-300 mt-1">{track.note}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(track.time).toLocaleString()}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
