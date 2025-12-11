import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Loader from "../../../Loader/Loader";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import useTitle from "../../../../hooks/useTitle";

const PendingOrders = () => {
  useTitle("Pending Orders");
  const axiosInstance = useAxios();
  const modalRef = useRef();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  const userStatus = users[0];

  const { data: pendingOrder = [], refetch: refetchPendingOrders } = useQuery({
    queryKey: ["pendingOrders", "Pending"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/orders/pending?orderStatus=Pending`
      );
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) =>
      axiosInstance.patch(`/orders/approve/${id}`, {
        orderStatus: "Approved",
      }),
    onSuccess: () => {
      Swal.fire({
        title: "Approved!",
        text: "Order approved successfully.",
        icon: "success",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "#fff",
      });
      refetchPendingOrders();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) =>
      axiosInstance.patch(`/orders/reject/${id}`, {
        orderStatus: "Rejected",
      }),
    onSuccess: () => {
      Swal.fire({
        title: "Rejected!",
        text: "Order rejected successfully.",
        icon: "error",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "#fff",
      });
      refetchPendingOrders();
    },
  });

  const openModal = (order) => {
    setSelectedOrder(order);
    modalRef.current.showModal();
  };

  if (isLoading) return <Loader />;

  // Motion Variants
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.6)" },
    tap: { scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="p-4">
      <motion.h2
        className="text-xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Pending Orders : ({pendingOrder.length})
      </motion.h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Order Date</th>
              <th>Payment Method</th>
              <th>payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {pendingOrder.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No Pending orders found.
                  </td>
                </tr>
              ) : (
                pendingOrder.map((order) => (
                  <motion.tr
                    key={order._id}
                    className="border-b"
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <td>{order._id}</td>
                    <td>{order.buyerEmail}</td>
                    <td>{order.productTitle}</td>
                    <td>{order.quantity}</td>
                    <td>{new Date(order.orderTime).toLocaleDateString()}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.status}</td>

                    <td className="flex gap-2 flex-wrap">
                      {userStatus.status === "suspended" ? (
                        <>
                          <motion.button
                            disabled
                            className="btn btn-xs bg-gray-600 text-white"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Approve
                          </motion.button>

                          <motion.button
                            disabled
                            className="btn btn-xs bg-gray-600 text-white"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Reject
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <motion.button
                            onClick={() => approveMutation.mutate(order._id)}
                            className="btn btn-xs bg-green-600 text-white"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Approve
                          </motion.button>

                          <motion.button
                            onClick={() => rejectMutation.mutate(order._id)}
                            className="btn btn-xs bg-red-600 text-white"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Reject
                          </motion.button>
                        </>
                      )}

                      <motion.button
                        onClick={() => openModal(order)}
                        className="btn btn-xs bg-blue-600 text-white"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        View
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.dialog
            ref={modalRef}
            className="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="modal-box bg-linear-to-br from-gray-900 to-gray-700 text-white">
              <h3 className="text-lg font-bold mb-3">Order Details</h3>

              {selectedOrder && (
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Order ID:</span>{" "}
                    {selectedOrder._id}
                  </p>
                  <p>
                    <span className="font-bold">User:</span>{" "}
                    {selectedOrder.buyerEmail}
                  </p>
                  <p>
                    <span className="font-bold">Product:</span>{" "}
                    {selectedOrder.productTitle}
                  </p>
                  <p>
                    <span className="font-bold">Quantity:</span>{" "}
                    {selectedOrder.quantity}
                  </p>
                  <p>
                    <span className="font-bold">Status:</span>{" "}
                    {selectedOrder.orderStatus}
                  </p>
                </div>
              )}

              <div className="modal-action">
                <motion.button
                  className="btn"
                  onClick={() => modalRef.current.close()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingOrders;
