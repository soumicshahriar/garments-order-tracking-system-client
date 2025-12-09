import { useState, useMemo, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart, FaHeart, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const AllProducts = () => {
  const axiosInstance = useAxios();
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 9;

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
        filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
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

  // apply pagination
  const totalPages = Math.ceil(filteredProducts.length / itemPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemPerPage;
    return filteredProducts.slice(start, start + itemPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, priceRange, selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0 },
  };

  if (isPending) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-16 w-16 border-t-4 border-cyan-500 border-solid"
            ></motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  if (isError) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <p className="text-red-400 text-lg font-semibold">
              Error: {error?.message || "Failed to fetch products"}
            </p>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 mb-4">
            All Products
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-20 sm:w-24 h-1 bg-linear-to-r from-cyan-500 to-blue-600 mx-auto shadow-lg shadow-cyan-500/50 mb-4"
          ></motion.div>
          <p className="text-gray-300 text-sm sm:text-base">
            Browse our complete collection of {allProducts.length} premium
            garments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6 sticky top-24 shadow-xl shadow-black/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span>Filters</span>
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-cyan-400 mb-3">
                  Category
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-cyan-500 focus:outline-none transition-all backdrop-blur-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </motion.select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-cyan-400 mb-3">
                  Price Range
                </label>
                <motion.div className="space-y-4">
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
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </motion.div>
              </div>

              {/* Clear Filters */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSortBy("newest");
                  setPriceRange([0, 1000]);
                  setSelectedCategory("all");
                }}
                className="w-full px-4 py-3 bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-md"
              >
                Clear Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Products Area */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
            >
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
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-cyan-500 focus:outline-none transition-all backdrop-blur-sm text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                </motion.select>
              </div>
            </motion.div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key="products-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {currentProducts.map((product) => (
                    <motion.div
                      key={product._id || product.id}
                      variants={itemVariants}
                      whileHover="hover"
                      className="group relative bg-linear-to-br from-gray-800 to-gray-900 
                      rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl 
                      hover:shadow-cyan-500/20 transition-all duration-300 
                      border border-gray-700 hover:border-cyan-500/30 
                      flex flex-col h-full"
                    >
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-cyan-500/0 via-cyan-500/0 to-transparent group-hover:from-cyan-500/10 group-hover:via-cyan-500/5 group-hover:to-transparent transition-all duration-500 z-0"></div>

                      {/* Product Image */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden bg-gray-700 h-64"
                      >
                        <img
                          src={
                            product.images[0] ||
                            "https://via.placeholder.com/300x400?text=No+Image"
                          }
                          alt={product.title || "Product"}
                          className="w-full h-full object-cover transition-transform duration-700"
                        />

                        {/* Stock Badge */}
                        {product.availableQuantity > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute bottom-4 left-4 px-3 py-1 bg-linear-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg"
                          >
                            {product.availableQuantity} In Stock
                          </motion.div>
                        )}

                        {/* Quick Actions Overlay */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute top-4 right-4 flex flex-col gap-2"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-red-400 transition-colors"
                          >
                            <FaHeart className="text-sm" />
                          </motion.button>
                        </motion.div>
                      </motion.div>

                      {/* Product Info */}
                      <div className="p-5 flex flex-col flex-grow relative z-10">
                        {/* Category */}
                        {product.category && (
                          <motion.p
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                            className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2"
                          >
                            {product.category}
                          </motion.p>
                        )}

                        {/* Product Name */}
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 mb-2">
                          {product.title || "Product"}
                        </h3>

                        {/* Product Description */}
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                          {product.description ||
                            product.shortDescription ||
                            product.short_desc ||
                            "High-quality garment"}
                        </p>

                        {/* Price & Stock Info */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                          <div>
                            <motion.p
                              whileHover={{ scale: 1.05 }}
                              className="text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400"
                            >
                              ${product.price}
                            </motion.p>
                          </div>
                          <div className="text-right">
                            {product?.availableQuantity > 0 ? (
                              <motion.p
                                animate={{
                                  scale: [1, 1.05, 1],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 2,
                                }}
                                className="text-xs font-semibold text-green-400"
                              >
                                In Stock
                              </motion.p>
                            ) : (
                              <p className="text-xs font-semibold text-red-400">
                                Out of Stock
                              </p>
                            )}
                          </div>
                        </div>

                        {/* View Details Button - Always at bottom */}
                        <motion.div
                          className="mt-6 pt-4 border-t border-gray-700"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Link
                            to={`/product-details/${product._id}`}
                            className="w-full px-4 py-3 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-500 disabled:hover:to-blue-600"
                            disabled={product.availableQuantity === 0}
                          >
                            <FaShoppingCart className="text-lg" />
                            <span>View Details</span>
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-products"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="inline-block p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
                    <p className="text-gray-300 text-lg font-semibold mb-2">
                      No products found
                    </p>
                    <p className="text-gray-500 text-sm">
                      Try adjusting your filters or search criteria
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSortBy("newest");
                        setPriceRange([0, 1000]);
                        setSelectedCategory("all");
                      }}
                      className="mt-4 px-6 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold transition-all border border-cyan-500/30"
                    >
                      Reset Filters
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-40 disabled:hover:bg-gray-700 transition-all"
                >
                  Prev
                </motion.button>

                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === i + 1
                        ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-40 disabled:hover:bg-gray-700 transition-all"
                >
                  Next
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AllProducts;
