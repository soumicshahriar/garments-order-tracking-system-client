import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { motion } from "motion/react";

const ApproveOrders = () => {
  const axiosInstance = useAxios();

  const addTrackingModalRef = useRef();
  const viewTrackingModalRef = useRef();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingList, setTrackingList] = useState([]);

  // FETCH APPROVED ORDERS
  const {
    data: approvedOrders = [],
    isPending,
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

  // --- ADD TRACKING MUTATION ---
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
    },
  });

  // --- FETCH TRACKING FOR VIEW MODAL ---
  const handleViewTracking = async (order) => {
    setSelectedOrder(order);
    const res = await axiosInstance.get(`/tracking/${order._id}`);
    setTrackingList(res.data);
    viewTrackingModalRef.current.showModal();
  };

  // --- OPEN ADD TRACKING MODAL ---
  const handleAddTracking = (order) => {
    setSelectedOrder(order);
    addTrackingModalRef.current.showModal();
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Approved Orders ({approvedOrders.length})
      </h2>

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
            {approvedOrders.map((order) => (
              <tr key={order._id} className="border-b">
                <td>{order._id}</td>
                <td>{order.buyerEmail}</td>
                <td>{order.productTitle}</td>
                <td>{order.quantity}</td>
                <td>
                  {order.approvedAt
                    ? new Date(order.approvedAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() => handleAddTracking(order)}
                    className="btn btn-xs bg-purple-600 text-white"
                  >
                    Add Tracking
                  </button>

                  <button
                    onClick={() => handleViewTracking(order)}
                    className="btn btn-xs bg-blue-600 text-white"
                  >
                    View Tracking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD TRACKING MODAL */}
      <dialog ref={addTrackingModalRef} className="modal">
        <div className="modal-box bg-gradient-to-br from-gray-900 to-gray-700 text-white">
          <h3 className="text-lg font-bold mb-3">Add Tracking</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const tracking = {
                location: e.target.location.value,
                note: e.target.note.value,
                status: e.target.status.value,
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
            ></textarea>

            <select
              name="status"
              required
              className="select select-bordered w-full"
            >
              <option>Cutting Completed</option>
              <option>Sewing Started</option>
              <option>Finishing</option>
              <option>QC Checked</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
            </select>

            <button className="btn bg-purple-600 text-white w-full">
              Submit
            </button>
          </form>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => addTrackingModalRef.current.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* VIEW TRACKING TIMELINE MODAL */}
      {/* VIEW TRACKING TIMELINE MODAL */}
      <dialog ref={viewTrackingModalRef} className="modal">
        <div className="modal-box bg-gray-900 text-white max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">
            Tracking Timeline – {selectedOrder?.productName}
          </h3>

          <div className="space-y-6 relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 w-1 h-full bg-linear-to-b from-blue-500 to-purple-500 opacity-40 rounded-full"></div>

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
                {/* Timeline Dot */}
                <motion.div
                  className="w-4 h-4 rounded-full bg-blue-500 shadow-lg absolute left-2 top-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: i * 0.15,
                  }}
                ></motion.div>

                {/* Content Card */}
                <motion.div
                  className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                  whileHover={{
                    boxShadow: "0px 0px 15px rgba(59,130,246,0.4)",
                  }}
                >
                  <p className="text-blue-300 font-semibold">{track.status}</p>
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
            <button
              className="btn"
              onClick={() => viewTrackingModalRef.current.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApproveOrders;
