import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useRef } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import "./HeroBanner.css";

const HeroBanner = ({ allProducts = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const fallback = [
    {
      id: "f1",
      title: "Elevate Your Style",
      subtitle: "New arrivals — crafted for comfort",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1400",
    },
    {
      id: "f2",
      title: "Bold & Modern",
      subtitle: "Limited edition pieces — shop the drop",
      image:
        "https://images.unsplash.com/photo-1520975912655-0c5f6f2b5b1a?q=80&w=1400",
    },
  ];

  const slides =
    Array.isArray(allProducts) && allProducts.length
      ? allProducts
          .filter((p) => p.showOnHome)
          .map((p) => ({
            id: p._id,
            title: p.title || p.productName || "",
            price: `$${p.price}`,
            imageMain: p.images?.[0] || fallback[0].image,
            imagePeek: p.images?.[1] || p.images?.[0] || fallback[1].image,
          }))
      : fallback.map((f) => ({
          id: f.id,
          title: f.title,
          subtitle: f.subtitle,
          imageMain: f.image,
          imagePeek: f.image,
        }));

  return (
    <div className="p-4 max-w-7xl mx-auto relative">
      {/* 🌟 FLOATING ICONS */}
      {/* <motion.img
        src="https://cdn-icons-png.flaticon.com/512/4341/4341054.png"
        className="w-12 h-12 absolute top-20 left-8 opacity-40"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      /> */}
      {/* <motion.img
        src="https://cdn-icons-png.flaticon.com/512/2991/2991108.png"
        className="w-10 h-10 absolute top-40 right-6 opacity-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      /> */}

      <motion.div
        className="bg-black/20 rounded-lg mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          speed={1000}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-auto"
        >
          {slides.map((item, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-10 py-10 px-6 lg:px-12"
              >
                {/* TEXT */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/2 text-center lg:text-left"
                >
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {item.title}
                  </h1>
                  <p className="text-gray-300 mt-2 mb-4 text-lg">
                    {item.price || item.subtitle}
                  </p>

                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <Link
                      to={`/order-form/${item.id}`}
                      className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
                    >
                      Shop Now
                    </Link>
                    <Link
                      to={`/product-details/${item.id}`}
                      className="text-cyan-300 underline"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>

                {/* IMAGE — PARALLAX EFFECT */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <motion.img
                    src={item.imageMain}
                    alt="main"
                    className="rounded-xl w-72 lg:w-80 shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.img
                    src={item.imagePeek}
                    alt="peek"
                    className="rounded-xl w-40 absolute -right-8 bottom-4 opacity-70 shadow-lg"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
