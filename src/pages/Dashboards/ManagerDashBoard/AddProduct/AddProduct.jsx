import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import useSuspend from "../../../../hooks/useSuspend";
import { motion } from "framer-motion";
import Loader from "../../../Loader/Loader";
import useTitle from "../../../../hooks/useTitle";

const categories = [
  "Shirt",
  "Pant",
  "T-Shirt",
  "Jacket",
  "Accessories",
  "Hoodie",
  "Shorts",
  "Leggings",
  "",
];
const paymentOption = ["Cash on Delivery", "PayFirst"];

const AddProduct = () => {
  useTitle("Add Product");
  const axiosInstance = useAxios();
  const [imagePreview, setImagePreview] = useState([]);
  const { user, loading } = useAuth();
  const { status } = useSuspend();
  console.log(status);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previewURLs);
  };

  const mutation = useMutation({
    mutationFn: async (productData) => {
      const res = await axiosInstance.post("/products", productData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
      reset();
      setImagePreview([]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: () => toast.error("Failed to create product"),
  });

  const onSubmit = async (data) => {
    try {
      const toastId = toast.loading("Uploading images...");
      const imageFiles = Array.from(data.images);
      const uploadedImageURLs = await Promise.all(
        imageFiles.map((file) => uploadToImgBB(file))
      );

      toast.success("Images uploaded!", { id: toastId });
      if (data.minimumOrderQuantity <= 0) {
        return toast("please insert minimum order quantity at least 1");
      }

      const productPayload = {
        title: data.title,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        availableQuantity: Number(data.availableQuantity),
        minimumOrderQuantity: Number(data.minimumOrderQuantity),
        images: uploadedImageURLs,
        demoVideo: data.demoVideo || "",
        paymentOption: data.paymentOption,
        showOnHome: data.showOnHome || false,
        managerInfo: {
          managerEmail: user?.email,
        },
      };

      // console.log("FINAL PAYLOAD:", productPayload);
      mutation.mutate(productPayload);
    } catch (error) {
      toast.error("Image upload failed!");
      console.error(error);
    }
  };

  // Motion Variants
  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <motion.div
      className="p-4"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <div className="max-w-3xl mx-auto p-6  bg-gray-900 rounded">
        <motion.h2
          className="md:text-3xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Add New Product
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <motion.input
            type="text"
            placeholder="Product Title/ Product Name"
            {...register("title", { required: true })}
            className="w-full p-3 rounded bg-gray-800 text-white"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.textarea
            placeholder="Product Description"
            {...register("description", { required: true })}
            rows="4"
            className="w-full p-3 rounded bg-gray-800 text-white"
            whileFocus={{ scale: 1.02 }}
          ></motion.textarea>

          <motion.select
            {...register("category", { required: true })}
            className="w-full p-3 rounded bg-gray-800 text-white"
            whileFocus={{ scale: 1.02 }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </motion.select>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.input
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
              className="p-3 rounded bg-gray-800 text-white"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="number"
              placeholder="Available Quantity"
              {...register("availableQuantity", { required: true })}
              className="p-3 rounded bg-gray-800 text-white"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="number"
              defaultValue={1}
              placeholder="Minimum Order Quantity"
              {...register("minimumOrderQuantity", { required: true })}
              className="p-3 rounded bg-gray-800 text-white"
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          <motion.input
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
              <motion.img
                key={idx}
                src={img}
                className="w-20 h-20 rounded object-cover border"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            ))}
          </div>

          <motion.input
            type="text"
            placeholder="Demo Video Link (optional)"
            {...register("demoVideo")}
            className="w-full p-3 rounded bg-gray-800 text-white"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.select
            {...register("paymentOption", { required: true })}
            className="w-full p-3 rounded bg-gray-800 text-white"
            whileFocus={{ scale: 1.02 }}
          >
            <option disabled>Select Payment Option</option>
            {paymentOption.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </motion.select>

          <label className="flex items-center text-white gap-3">
            <input type="checkbox" {...register("showOnHome")} />
            Show on Home Page
          </label>

          {status === "suspended" || status === "pending" ? (
            <motion.button
              type="submit"
              className="w-full bg-gray-600 p-3 rounded text-white mt-4"
              disabled
              whileHover={{ scale: 1.02 }}
            >
              You are suspended / pending
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={mutation.isLoading}
              className="w-full bg-blue-600 p-3 rounded text-white mt-4"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {mutation.isLoading ? "Saving..." : "Add Product"}
            </motion.button>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default AddProduct;
