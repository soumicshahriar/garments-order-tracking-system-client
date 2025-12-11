import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../../Loader/Loader";
import useTitle from "../../../../hooks/useTitle";

// FIXED ORDER OF TRACKING STEPS
const TRACKING_STEPS = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

const ApproveOrders = () => {
  useTitle("Approve Orders");
  const axiosInstance = useAxios();

  const addTrackingModalRef = useRef();
  const viewTrackingModalRef = useRef();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingList, setTrackingList] = useState([]);
  const [nextExpectedStep, setNextExpectedStep] = useState("");

  // Determine next step based on last tracking
  const getNextStep = (trackingData) => {
    if (!trackingData || trackingData.length === 0) return TRACKING_STEPS[0];
    const lastStep = trackingData[trackingData.length - 1].status;
    const lastIndex = TRACKING_STEPS.indexOf(lastStep);
    if (lastIndex === TRACKING_STEPS.length - 1) return null; // Fully completed
    return TRACKING_STEPS[lastIndex + 1];
  };

  // Fetch approved orders
  const {
    data: approvedOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approvedOrders", "Approved"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/orders/approve?orderStatus=Approved`
      );
      return res.data;
    },
  });

  // Add tracking mutation
  const addTrackingMutation = useMutation({
    mutationFn: async ({ orderId, tracking }) =>
      axiosInstance.post(`/tracking/${orderId}`, tracking),
    onSuccess: () => {
      Swal.fire({
        title: "Added!",
        text: "Tracking info added.",
        icon: "success",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "#fff",
      });
      addTrackingModalRef.current.close();
      refetch();
    },
  });

  // View timeline
  const handleViewTracking = async (order) => {
    setSelectedOrder(order);
    const res = await axiosInstance.get(`/tracking/${order._id}`);
    setTrackingList(res.data);
    viewTrackingModalRef.current.showModal();
  };

  // Open Add Tracking but prevent wrong steps
  const handleAddTracking = async (order) => {
    setSelectedOrder(order);
    const res = await axiosInstance.get(`/tracking/${order._id}`);
    setTrackingList(res.data);

    const nextStep = getNextStep(res.data);
    if (!nextStep) {
      Swal.fire({
        icon: "info",
        title: "Tracking Completed",
        text: "This order has reached the final stage (Out for Delivery).",
      });
      return;
    }

    setNextExpectedStep(nextStep);
    addTrackingModalRef.current.showModal();
  };

  if (isLoading) return <Loader />;

  // Variants
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 10px rgba(255,255,255,0.6)" },
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
        Approved Orders ({approvedOrders.length})
      </motion.h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Approved At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {approvedOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No Approved orders found.
                  </td>
                </tr>
              ) : (
                approvedOrders.map((order) => (
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
                    <td>
                      {order.approvedAt
                        ? new Date(order.approvedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="flex gap-2 flex-wrap">
                      <motion.button
                        onClick={() => handleAddTracking(order)}
                        className="btn btn-xs bg-purple-600 text-white"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Add Tracking
                      </motion.button>

                      <motion.button
                        onClick={() => handleViewTracking(order)}
                        className="btn btn-xs bg-blue-600 text-white"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        View Tracking
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* ADD TRACKING MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.dialog
            ref={addTrackingModalRef}
            className="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="modal-box bg-linear-to-br from-gray-900 to-gray-700 text-white">
              <h3 className="text-lg font-bold mb-3">Add Tracking</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const tracking = {
                    location: e.target.location.value,
                    note: e.target.note.value,
                    status: nextExpectedStep,
                    time: new Date(),
                  };
                  addTrackingMutation.mutate({
                    orderId: selectedOrder._id,
                    tracking,
                  });
                }}
                className="space-y-3"
              >
                <input
                  name="location"
                  required
                  placeholder="Location"
                  className="input input-bordered w-full"
                />
                <textarea
                  name="note"
                  required
                  placeholder="Note"
                  className="textarea textarea-bordered w-full"
                />
                <input
                  name="status"
                  readOnly
                  className="input input-bordered w-full bg-gray-700 text-white"
                  value={nextExpectedStep}
                />
                <button className="btn bg-purple-600 text-white w-full">
                  Submit
                </button>
              </form>

              <div className="modal-action">
                <motion.button
                  className="btn"
                  onClick={() => addTrackingModalRef.current.close()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>

      {/* VIEW TRACKING MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.dialog
            ref={viewTrackingModalRef}
            className="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="modal-box bg-gray-900 text-white max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">
                Tracking Timeline – {selectedOrder?.productName}
              </h3>

              <div className="space-y-6 relative">
                <div className="absolute left-4 top-0 w-1 h-full bg-blue-500 opacity-40 rounded-full"></div>

                {trackingList.length === 0 && (
                  <p className="text-gray-400 text-center">No tracking yet</p>
                )}

                {trackingList.map((track, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative pl-10"
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full bg-blue-500 shadow-lg absolute left-2 top-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: i * 0.15,
                      }}
                    />
                    <motion.div
                      className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                      whileHover={{
                        boxShadow: "0px 0px 15px rgba(59,130,246,0.4)",
                      }}
                    >
                      <p className="text-blue-300 font-semibold">
                        {track.status}
                      </p>
                      <p className="text-sm">{track.location}</p>
                      <p className="text-xs text-gray-300 mt-1">{track.note}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(track.time).toLocaleString()}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="modal-action">
                <motion.button
                  className="btn"
                  onClick={() => viewTrackingModalRef.current.close()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApproveOrders;
