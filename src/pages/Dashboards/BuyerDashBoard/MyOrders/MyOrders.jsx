import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useTitle from "../../../../hooks/useTitle";

const MyOrders = () => {
  useTitle("My Orders");
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetch user orders
  const { data: myOrders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const res = await axiosInstance.delete(`/orders/${id}`);
    if (res.data.deletedCount > 0) {
      setSelectedOrderId(null);
      queryClient.invalidateQueries(["myOrders", user.email]);
    }
  };

  if (isLoading)
    return (
      <p className="p-4 text-center text-gray-300">Loading your orders...</p>
    );

  // Motion variants
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="p-5">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4"
      >
        My Orders : ({myOrders.length})
      </motion.h2>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Order Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {myOrders.map((order) => (
              <motion.tr
                key={order._id}
                className="text-center hover:bg-gray-500/50"
                variants={rowVariants}
              >
                <td className="border p-2">{order._id}</td>
                <td className="border p-2">{order.productTitle}</td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2 capitalize">{order.status}</td>
                <td className="border p-2 capitalize">{order.orderStatus}</td>
                <td className="border p-2">{order.paymentMethod}</td>
                <td className="border p-2 space-x-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Link
                    to={`/dashboard/track-order/${order._id}`}
                    className=" bg-blue-500 text-white rounded"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    View
                  </Link>

                  {order.status === "pending" && (
                    <motion.button
                      className=" bg-red-500 text-white rounded"
                      onClick={() => setSelectedOrderId(order._id)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Cancel
                    </motion.button>
                  )}
                </td>
              </motion.tr>
            ))}

            {myOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {selectedOrderId && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-cyan-900 border border-cyan-300 p-6 rounded shadow-lg w-80"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <h3 className="text-xl font-semibold mb-2">Cancel Order?</h3>
              <p className="mb-4">
                Are you sure you want to cancel this order? This action cannot
                be undone.
              </p>

              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setSelectedOrderId(null)}
                  className="px-3 py-1 cursor-pointer border rounded"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  ×
                </motion.button>

                <motion.button
                  onClick={() => handleCancel(selectedOrderId)}
                  className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:shadow-lg hover:shadow-red-500"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Confirm Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;
