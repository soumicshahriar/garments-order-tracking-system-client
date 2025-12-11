import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import useAxios from "../../../../hooks/useAxios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Loader from "../../../Loader/Loader";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const Products = () => {
  const axiosInstance = useAxios();

  const modalRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-products");
      return res.data;
    },
  });

  const handleToggleHome = async (id, current) => {
    try {
      await axiosInstance.patch(`/products/show-home/${id}`, {
        value: !current,
      });
      toast.success("Updated for home!");
      refetch();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You won't be able to revert ${product?.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "#f1f5f9",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/products/${product._id}`);
      toast.success("Product deleted");
      refetch();

      await Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#f1f5f9",
      });
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    modalRef.current.showModal();
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="p-4">
      <motion.h2
        className="text-xl font-bold mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Products : ({products.length})
      </motion.h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded">
        <table className="table w-full border border-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.tr
                  key={product._id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <td>
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>

                  <td className="font-semibold">{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.createdBy?.name}</td>

                  <td>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() =>
                        handleToggleHome(product._id, product.showOnHome)
                      }
                      className="text-2xl"
                    >
                      {product.showOnHome ? (
                        <FaToggleOn className="text-green-400" />
                      ) : (
                        <FaToggleOff className="text-gray-400" />
                      )}
                    </motion.button>
                  </td>

                  <td>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => openModal(product)}
                      className="text-blue-500 text-xl hover:text-blue-700 mr-4"
                    >
                      <FaEdit />
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => handleDelete(product)}
                      className="text-red-500 text-xl hover:text-red-700"
                    >
                      <FaTrash />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <dialog ref={modalRef} className="modal">
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="modal-box bg-gray-900 text-white max-w-lg"
            >
              <h3 className="font-bold text-xl mb-4">Update Product</h3>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;

                  const updatedData = {
                    title: form.title.value,
                    description: form.description.value,
                    price: Number(form.price.value),
                    category: form.category.value,
                    demoVideo: form.demoVideo.value,
                    paymentOption: [form.paymentOption.value],
                  };

                  try {
                    await axiosInstance.patch(
                      `/products/update/${selectedProduct._id}`,
                      updatedData
                    );

                    toast.success("Product updated!");
                    modalRef.current.close();
                    setSelectedProduct(null);
                    refetch();
                  } catch (error) {
                    toast.error("Update failed!");
                  }
                }}
              >
                <label className="block mb-1">Title</label>
                <input
                  name="title"
                  defaultValue={selectedProduct.title}
                  className="input input-bordered w-full bg-gray-800 mb-3"
                />

                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedProduct.description}
                  className="textarea textarea-bordered w-full bg-gray-800 mb-3"
                />

                <label className="block mb-1">Price</label>
                <input
                  name="price"
                  type="number"
                  defaultValue={selectedProduct.price}
                  className="input input-bordered w-full bg-gray-800 mb-3"
                />

                <label className="block mb-1">Category</label>
                <input
                  name="category"
                  defaultValue={selectedProduct.category}
                  className="input input-bordered w-full bg-gray-800 mb-3"
                />

                <label className="block mb-1">Demo Video URL</label>
                <input
                  name="demoVideo"
                  defaultValue={selectedProduct.demoVideo}
                  className="input input-bordered w-full bg-gray-800 mb-3"
                />

                <label className="block mb-1">Payment Options</label>
                <select
                  name="paymentOption"
                  defaultValue={selectedProduct.paymentOption[0]}
                  className="select select-bordered w-full bg-gray-800 mb-4"
                >
                  <option value="PayFirst">PayFirst</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>

                <div className="modal-action flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      modalRef.current.close();
                      setSelectedProduct(null);
                    }}
                    className="btn btn-sm bg-gray-700 text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-sm bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </div>
  );
};

export default Products;
