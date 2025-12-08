import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import useAxios from "../../../../hooks/useAxios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useRef, useState } from "react";

const Products = () => {
  const axiosInstance = useAxios();

  //   for modal
  const modalRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products = [], refetch } = useQuery({
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
      background: "linear-gradient(135deg, #0f172a, #1e293b)", // dark gradient
      color: "#f1f5f9", // soft text color
      customClass: {
        popup: "my-swal-popup",
      },
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
        customClass: {
          popup: "my-swal-popup",
        },
      });
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  //   open modal
  const openModal = (product) => {
    setSelectedProduct(product);
    modalRef.current.showModal();
  };
  console.log(selectedProduct);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        All Products : ({products.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
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
            {products.map((product) => (
              <tr key={product._id} className="hover">
                <td>
                  <img
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
                  <button
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
                  </button>
                </td>

                <td className="">
                  <button
                    onClick={() => openModal(product)}
                    className="text-blue-500 text-xl hover:text-blue-700 mr-5"
                    title="Edit Product"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(product)}
                    className="text-red-500 text-xl hover:text-red-700"
                    title="Delete Product"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal section */}

      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-gray-900 text-white max-w-lg">
          <h3 className="font-bold text-xl mb-4">Update Product</h3>

          {selectedProduct && (
            <form
              key={selectedProduct._id}
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
                  refetch();
                } catch (error) {
                  toast.error("Update failed!");
                }
              }}
            >
              {/* Title */}
              <label className="block mb-1">Title</label>
              <input
                name="title"
                defaultValue={selectedProduct.title}
                className="input input-bordered w-full bg-gray-800 mb-3"
              />

              {/* Description */}
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={selectedProduct.description}
                className="textarea textarea-bordered w-full bg-gray-800 mb-3"
              />

              {/* Price */}
              <label className="block mb-1">Price</label>
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={selectedProduct.price}
                className="input input-bordered w-full bg-gray-800 mb-3"
              />

              {/* Category */}
              <label className="block mb-1">Category</label>
              <input
                name="category"
                defaultValue={selectedProduct.category}
                className="input input-bordered w-full bg-gray-800 mb-3"
              />

              {/* Demo Video URL */}
              <label className="block mb-1">Demo Video URL</label>
              <input
                name="demoVideo"
                defaultValue={selectedProduct.demoVideo}
                className="input input-bordered w-full bg-gray-800 mb-3"
              />

              {/* Payment Options */}
              <label className="block mb-1">Payment Options</label>
              <select
                name="paymentOption"
                defaultValue={selectedProduct.paymentOption[0]}
                className="select select-bordered w-full bg-gray-800 mb-4"
              >
                <option value="PayFast">PayFast</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>

              <div className="modal-action flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => modalRef.current.close()}
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
          )}
        </div>
      </dialog>
    </div>
  );
};

export default Products;
