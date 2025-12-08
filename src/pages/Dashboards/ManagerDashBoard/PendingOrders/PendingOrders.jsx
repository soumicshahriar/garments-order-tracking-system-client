import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Loader from "../../../Loader/Loader";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const axiosInstance = useAxios();
  const modalRef = useRef();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch all pending orders
  const {
    data: pendingOrder = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pendingOrders", "Pending"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/orders/pending?orderStatus=Pending`
      );
      return res.data;
    },
  });

  // Approve order mutation
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
      refetch();
    },
  });

  // Reject order mutation
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
      refetch();
    },
  });

  // Open modal
  const openModal = (order) => {
    setSelectedOrder(order);
    modalRef.current.showModal();
  };

  // loading
  if (isPending) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Pending Orders : ({pendingOrder.length})
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
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {pendingOrder.map((order) => (
              <tr key={order._id} className="border-b">
                <td>{order._id}</td>
                <td>{order.buyerEmail}</td>
                <td>{order.productTitle}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.orderTime).toLocaleDateString()}</td>

                <td className="flex gap-2">
                  <button
                    onClick={() => approveMutation.mutate(order._id)}
                    className="btn btn-xs bg-green-600 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectMutation.mutate(order._id)}
                    className="btn btn-xs bg-red-600 text-white"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => openModal(order)}
                    className="btn btn-xs bg-blue-600 text-white"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {pendingOrder.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No Pending orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-linear-to-br from-gray-900 to-gray-700 text-white">
          <h3 className="text-lg font-bold mb-3">Order Details</h3>

          {selectedOrder && (
            <div className="space-y-2">
              <p>
                <span className="font-bold">Order ID:</span> {selectedOrder._id}
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
            <button className="btn" onClick={() => modalRef.current.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PendingOrders;
