import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";

const MyOrders = () => {
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

      // Refresh orders without reloading page
      queryClient.invalidateQueries(["myOrders", user.email]);
    }
  };

  if (isLoading) return <p className="p-4">Loading your orders...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myOrders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border p-2">{order._id}</td>
                <td className="border p-2">{order.productTitle}</td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2 capitalize">{order.status}</td>
                <td className="border p-2">{order.paymentMethod}</td>

                <td className="border p-2 space-x-2">
                  {/* View Button */}
                  <button
                    onClick={() =>
                      console.log("Open order details:", order._id)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </button>

                  {/* Cancel Button */}
                  {order.status === "pending" && (
                    <>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => setSelectedOrderId(order._id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancel Confirmation Modal */}
      {selectedOrderId && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-cyan-900 border border-cyan-300 p-6 rounded shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Cancel Order?</h3>
            <p className="mb-4">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedOrderId(null)}
                className="px-3 py-1 cursor-pointer border rounded"
              >
                ×
              </button>

              <button
                onClick={() => handleCancel(selectedOrderId)}
                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:shadow-lg hover:shadow-red-500"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
