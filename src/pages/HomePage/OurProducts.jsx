import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";

const OurProducts = () => {
  const axiosInstance = useAxios();

  // TanStack Query hook
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["homeProducts", 6],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/all-products?homeOnly=true&limit=6`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  if (isLoading) {
    return <Loader></Loader>;
  }
  console.log(products);

  if (isError) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold">
              Error: {error?.message || "Failed to fetch products"}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Make sure the API is running at http://localhost:3000
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 mb-4"
          >
            Our Products
          </motion.h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 sm:w-20 h-1 bg-linear-to-r from-cyan-500 to-blue-600 mx-auto shadow-lg shadow-cyan-500/50"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
          >
            Discover our exclusive collection of premium garments crafted for
            comfort and style
          </motion.p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="group relative bg-linear-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 border border-gray-700 hover:border-cyan-500/50 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-700 h-56 sm:h-64 md:h-72">
                  <motion.img
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                    src={
                      product.images[0] ||
                      "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price + Stock */}
                  <div className="flex items-center justify-between mt-4 mb-2">
                    <p className="text-lg font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
                      ${product.price}
                    </p>

                    {product.availableQuantity > 0 ? (
                      <p className="text-xs font-semibold text-green-400">
                        In Stock ({product.availableQuantity})
                      </p>
                    ) : (
                      <p className="text-xs font-semibold text-yellow-400">
                        Out of Stock
                      </p>
                    )}
                  </div>

                  {/* Button */}
                  <Link
                    to={`product-details/${product._id}`}
                    className="mt-auto w-full px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <FaShoppingCart /> View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products available</p>
          </div>
        )}

        {/* View All Button */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 sm:mt-16"
          >
            <Link
              to="/all-products"
              className="inline-block px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-base hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 border border-cyan-400/50 hover:border-cyan-400"
            >
              View All Products
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OurProducts;
