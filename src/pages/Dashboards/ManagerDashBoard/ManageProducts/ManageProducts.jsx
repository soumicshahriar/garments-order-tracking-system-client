import { useQuery, useMutation } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../Loader/Loader";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import useTitle from "../../../../hooks/useTitle";

const ManageProducts = () => {
  useTitle("Manage Products");
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const modalRef = useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/products?email=${user.email}`);
      return res.data;
    },
  });

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

  if (isLoading) return <Loader />;

  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setPrice(product.price);
    setAvailableQuantity(product.availableQuantity);
    setMinimumOrderQuantity(product.minimumOrderQuantity);
    modalRef.current.showModal();
  };

  // Motion Variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.6)" },
    tap: { scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div className="p-4 max-w-full overflow-x-auto">
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Manage Products : {filteredProducts.length}
      </motion.h2>

      <motion.input
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-md bg-gray-800 text-white mb-4"
        whileFocus={{ scale: 1.02 }}
      />

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="table w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available Quantity</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <motion.tr
                    key={product._id}
                    className="hover:bg-gray-800"
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <td>
                      <img
                        src={product.images?.[0]}
                        alt="product"
                        className="w-16 h-16 rounded object-cover"
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    {product?.availableQuantity == 0 ? (
                      <td
                        className="bg-cyan-900 rounded-2xl"
                        title="update quantity"
                      >
                        ${product.availableQuantity}
                      </td>
                    ) : (
                      <td>${product.availableQuantity}</td>
                    )}
                    <td>{product.paymentOption}</td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          className="btn btn-sm bg-blue-600 text-white"
                          onClick={() => handleOpenModal(product)}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Update
                        </motion.button>

                        <motion.button
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
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* UPDATE PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.dialog
            ref={modalRef}
            className="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="modal-box bg-gray-900 text-white border border-gray-700"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-xl font-bold mb-4">Update Product</h3>

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

                <div className="flex flex-wrap justify-end gap-2">
                  <motion.button
                    type="button"
                    onClick={() => modalRef.current.close()}
                    className="btn bg-gray-600 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="btn bg-blue-600 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Backdrop */}
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </motion.dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageProducts;
