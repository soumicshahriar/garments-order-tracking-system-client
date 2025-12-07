import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";

const categories = [
  "Shirt",
  "Pant",
  "T-Shirt",
  "Jacket",
  "Accessories",
  "Hoodie",
  "Shorts",
  "Leggings",
  ""
];
const paymentOptions = ["Cash on Delivery", "PayFast"];

const AddProduct = () => {
  const axiosInstance = useAxios();
  const [imagePreview, setImagePreview] = useState([]);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Upload each image to ImgBB
  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_api_key}`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data?.data?.url;
  };

  // Image Preview
  const handleImageChange = (e) => {
    const files = [...e.target.files];
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previewURLs);
  };

  // Mutation for posting product
  const mutation = useMutation({
    mutationFn: async (productData) => {
      const res = await axiosInstance.post("/products", productData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
      reset();
      setImagePreview([]);
    },
    onError: () => toast.error("Failed to create product"),
  });

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      const toastId = toast.loading("Uploading images...");

      // Convert FileList to real Array
      const imageFiles = Array.from(data.images);

      // Upload all images in parallel
      const uploadedImageURLs = await Promise.all(
        imageFiles.map((file) => uploadToImgBB(file))
      );

      toast.success("Images uploaded!", { id: toastId });

      // Prepare product object
      const productPayload = {
        title: data.title,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        availableQuantity: Number(data.availableQuantity),
        minimumOrderQuantity: Number(data.minimumOrderQuantity),
        images: uploadedImageURLs, // multiple URLs
        demoVideo: data.demoVideo || "",
        paymentOptions: data.paymentOption,
        showOnHome: data.showOnHome || false,

        managerInfo: {
          managerEmail: user?.email,
        },
      };

      console.log("FINAL PAYLOAD:", productPayload);

      // Save product in DB
      mutation.mutate(productPayload);
    } catch (error) {
      toast.error("Image upload failed!");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto p-6 mt-20 bg-gray-900 rounded">
        <h2 className="text-3xl font-bold mb-6 text-white">Add New Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Product Title/ Product Name"
            {...register("title", { required: true })}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <textarea
            placeholder="Product Description"
            {...register("description", { required: true })}
            rows="4"
            className="w-full p-3 rounded bg-gray-800 text-white"
          ></textarea>

          <select
            {...register("category", { required: true })}
            className="w-full p-3 rounded bg-gray-800 text-white"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
              className="p-3 rounded bg-gray-800 text-white"
            />
            <input
              type="number"
              placeholder="Available Quantity"
              {...register("availableQuantity", { required: true })}
              className="p-3 rounded bg-gray-800 text-white"
            />
            <input
              type="number"
              placeholder="Minimum Order Quantity"
              {...register("minimumOrderQuantity", { required: true })}
              className="p-3 rounded bg-gray-800 text-white"
            />
          </div>

          {/* Multiple Image Upload */}
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("images", { required: true })}
            onChange={handleImageChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          {/* Preview */}
          <div className="flex flex-wrap gap-3 mt-2">
            {imagePreview.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-20 h-20 rounded object-cover border"
              />
            ))}
          </div>

          <input
            type="text"
            placeholder="Demo Video Link (optional)"
            {...register("demoVideo")}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <select
            {...register("paymentOption", { required: true })}
            className="w-full p-3 rounded bg-gray-800 text-white"
          >
            <option value="">Select Payment Option</option>
            {paymentOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <label className="flex items-center text-white gap-3">
            <input type="checkbox" {...register("showOnHome")} />
            Show on Home Page
          </label>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 p-3 rounded text-white mt-4"
          >
            {mutation.isPending ? "Saving..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
