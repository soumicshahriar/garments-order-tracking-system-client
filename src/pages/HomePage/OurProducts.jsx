import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import Loader from "../Loader/Loader";

const OurProducts = () => {
  const axiosInstance = useAxios();

  // TanStack Query hook
  const {
    data: products = [],
    isPending,
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
  });

  if (isPending) {
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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 mb-4">
            Our Products
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-linear-to-r from-cyan-500 to-blue-600 mx-auto shadow-lg shadow-cyan-500/50"></div>
          <p className="mt-4 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Discover our exclusive collection of premium garments crafted for
            comfort and style
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="group relative bg-linear-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 border border-gray-700 hover:border-cyan-500/50 transform hover:-translate-y-2 flex flex-col"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-cyan-500/0 to-transparent group-hover:from-cyan-500/20 transition-all duration-300 z-10 pointer-events-none"></div>

                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-700 h-56 sm:h-64 md:h-72">
                  <img
                    src={
                      product.images[0] ||
                      "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={product.title || "Product"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5 relative z-20 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                    {product.title || "Product"}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2">
                    {product.description || "High-quality garment"}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mt-4 mb-2">
                    <div>
                      <p className="text-lg sm:text-base font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
                        ${product.price}
                      </p>
                    </div>
                    <div className="text-right">
                      {product.availableQuantity > 0 ? (
                        <>
                          <p className="text-xs font-semibold text-green-400">
                            In Stock <span>({product.availableQuantity})</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-xs font-semibold text-yellow-400">
                          Out of Stock
                        </p>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`product-details/${product._id}`}
                    className="w-full mt-auto px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
                  >
                    <FaShoppingCart className="text-lg" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products available</p>
          </div>
        )}

        {/* View All Button */}
        {products.length > 0 && (
          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/all-products"
              className="inline-block px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-base hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 border border-cyan-400/50 hover:border-cyan-400"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProducts;
