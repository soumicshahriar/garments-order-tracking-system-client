import React, { useState, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart, FaHeart, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";

const AllProducts = () => {
  const axiosInstance = useAxios();
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: allProducts = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-products");
      return Array.isArray(res.data) ? res.data : res.data.products || [];
    },
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category || "Uncategorized"));
    return Array.from(cats);
  }, [allProducts]);

  console.log("categories", categories);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter((p) => {
      const price = p.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name-a-z":
        filtered.sort((a, b) =>
          (a.name || a.title || "").localeCompare(b.name || b.title || "")
        );
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
    }

    return filtered;
  }, [allProducts, sortBy, priceRange, selectedCategory]);

  if (isPending) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500 border-solid"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400 text-lg font-semibold">
              Error: {error?.message || "Failed to fetch products"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen relative overflow-hidden">
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 mb-4">
            All Products
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-linear-to-r from-cyan-500 to-blue-600 mx-auto shadow-lg shadow-cyan-500/50 mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base">
            Browse our complete collection of {allProducts.length} premium
            garments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span>Filters</span>
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-cyan-400 mb-3">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-cyan-400 mb-3">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSortBy("newest");
                  setPriceRange([0, 1000]);
                  setSelectedCategory("all");
                }}
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Area */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="text-gray-300 text-sm">
                Showing{" "}
                <span className="font-bold text-cyan-400">
                  {filteredProducts.length}
                </span>{" "}
                products
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-300 text-sm font-semibold">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="group relative bg-linear-to-br from-gray-800 to-gray-900 
                    rounded-lg overflow-hidden shadow-xl hover:shadow-2xl 
                    hover:shadow-cyan-500/30 transition-all duration-300 
                    border border-gray-700 hover:border-cyan-500/50 
                    transform hover:-translate-y-2 flex flex-col"
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
                        alt={product.name || product.title || "Product"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Wishlist Heart */}
                      <button className="absolute top-4 right-4 p-2 bg-gray-900/80 backdrop-blur rounded-full shadow-lg hover:bg-red-500 hover:scale-110 transition-all duration-300 border border-gray-700 hover:border-red-500">
                        <FaHeart className="text-lg text-red-400 hover:text-white" />
                      </button>

                      {/* Stock Badge */}
                      {product.quantity > 0 && (
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-linear-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg">
                          {product.quantity} In Stock
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 sm:p-5 relative z-20 flex flex-col flex-1">
                      {/* Category */}
                      {product.category && (
                        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                          {product.category}
                        </p>
                      )}

                      {/* Product Name */}
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                        {product.name || product.title || "Product"}
                      </h3>

                      {/* Product Description */}
                      <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2">
                        {product.description ||
                          product.shortDescription ||
                          product.short_desc ||
                          "High-quality garment"}
                      </p>

                      {/* Rating (if available) */}
                      {product.rating && (
                        <div className="flex items-center space-x-1 mt-2">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="text-gray-300 text-xs font-semibold">
                            {product.rating}/5
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700 mb-4">
                        <div>
                          <p className="md:text-lg sm:text-base font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
                            ${(product.price || 0).toFixed(2)}
                          </p>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ${(product.originalPrice || 0).toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          {product?.availableQuantity > 0 ? (
                            <p className="text-xs font-semibold text-green-400">
                              In Stock
                            </p>
                          ) : (
                            <p className="text-xs font-semibold text-red-400">
                              Out of Stock
                            </p>
                          )}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Link
                        to={`/product-details/${product._id}`}
                        className="w-full mt-auto px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.quantity === 0}
                      >
                        <FaShoppingCart className="text-lg" />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg font-semibold mb-2">
                  No products found
                </p>
                <p className="text-gray-500 text-sm">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
