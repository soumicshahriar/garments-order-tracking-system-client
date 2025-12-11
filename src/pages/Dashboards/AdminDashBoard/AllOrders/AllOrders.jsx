import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Loader from "../../../Loader/Loader";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
  exit: { opacity: 0, scale: 0.95 },
};

const AllOrders = () => {
  const axiosInstance = useAxios();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: allOrders = [], isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/orders");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const filteredOrders = allOrders.filter((order) => {
    const matchSearch =
      order.productTitle.toLowerCase().includes(search.toLowerCase()) ||
      order.buyerEmail.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" ? true : order.orderStatus === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4"
      >
        All Orders
      </motion.h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by user or product..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded bg-cyan-900 text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto shadow rounded-lg"
      >
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2 text-gray-300">Order ID</th>
              <th className="border p-2 text-gray-300">User</th>
              <th className="border p-2 text-gray-300">Product</th>
              <th className="border p-2 text-gray-300">Quantity</th>
              <th className="border p-2 text-gray-300">Payment Status</th>
              <th className="border p-2 text-gray-300">Order Status</th>
              <th className="border p-2 text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredOrders.map((order, i) => (
                <motion.tr
                  key={order._id}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center hover:bg-gray-800/20"
                >
                  <td className="border p-2 text-sm text-gray-300">
                    {order._id}
                  </td>
                  <td className="border p-2 text-sm text-gray-300">
                    {order.buyerEmail}
                  </td>
                  <td className="border p-2 text-xs text-gray-300">
                    {order.productTitle}
                  </td>
                  <td className="border p-2 text-sm text-gray-300">
                    {order.quantity}
                  </td>
                  <td className="border p-2 text-sm text-gray-300">
                    {order.status}
                  </td>
                  <td className="border p-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        order.orderStatus === "Pending"
                          ? "bg-yellow-500"
                          : order.orderStatus === "Approved"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="border p-2">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Link
                        to={`/dashboard/order-details/${order._id}`}
                        className="btn btn-sm px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        View
                      </Link>
                    </motion.div>
                  </td>
                </motion.tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AllOrders;
