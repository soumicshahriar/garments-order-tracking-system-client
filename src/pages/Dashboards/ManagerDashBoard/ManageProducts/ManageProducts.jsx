import { useQuery, useMutation } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../Loader/Loader";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const modalRef = useRef(); // Modal ref
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Controlled inputs
  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState("");

  const [search, setSearch] = useState("");

  // ============================
  // Fetch Products by Manager
  // ============================
  const {
    data: products = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/products?email=${user.email}`);
      return res.data;
    },
  });

  // ============================
  // Delete Mutation
  // ============================
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosInstance.delete(`/products/${id}`),
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been removed.",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
      });
      refetch();
    },
  });

  // ============================
  // Update Mutation
  // ============================
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) =>
      axiosInstance.patch(`/products/${id}`, updatedData),
    onSuccess: () => {
      Swal.fire({
        title: "Updated!",
        text: "Product updated successfully.",
        icon: "success",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "#fff",
      });
      modalRef.current.close();
      refetch();
    },
  });

  if (isPending) return <Loader />;

  // ============================
  // Search Filter
  // ============================
  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  });

  // ============================
  // Open Modal and set controlled inputs
  // ============================
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setPrice(product.price);
    setAvailableQuantity(product.availableQuantity);
    setMinimumOrderQuantity(product.minimumOrderQuantity);
    modalRef.current.showModal();
  };

  // ============================
  // Render
  // ============================
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Manage Products : {filteredProducts.length}
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-md bg-gray-800 text-white mb-4"
      />

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="table w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-800">
                  <td>
                    <img
                      src={product.images?.[0]}
                      alt="product"
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.paymentOption}</td>
                  <td>
                    <div className="flex gap-3">
                      {/* Update Button */}
                      <button
                        className="btn btn-sm bg-blue-600 text-white"
                        onClick={() => handleOpenModal(product)}
                      >
                        Update
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() =>
                          Swal.fire({
                            title: "Are you sure?",
                            text: "This action cannot be undone!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Delete",
                            cancelButtonText: "Cancel",
                            background: "#0f172a",
                            color: "#fff",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteMutation.mutate(product._id);
                            }
                          })
                        }
                        className="btn btn-sm bg-linear-to-r from-red-700 to-red-900 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ============================
          UPDATE PRODUCT MODAL
      ============================ */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-gray-900 text-white border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Update Product</h3>

          {selectedProduct && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedData = {
                  price,
                  availableQuantity,
                  minimumOrderQuantity,
                };
                updateMutation.mutate({
                  id: selectedProduct._id,
                  updatedData,
                });
              }}
            >
              <label className="text-sm">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-white mb-4"
              />

              <label className="text-sm">Available Quantity</label>
              <input
                type="number"
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-white mb-4"
              />

              <label className="text-sm">Minimum Order Quantity</label>
              <input
                type="number"
                value={minimumOrderQuantity}
                onChange={(e) => setMinimumOrderQuantity(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-white mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => modalRef.current.close()}
                  className="btn bg-gray-600 text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-blue-600 text-white">
                  Save
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageProducts;
