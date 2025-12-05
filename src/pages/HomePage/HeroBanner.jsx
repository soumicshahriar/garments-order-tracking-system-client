import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroBanner = ({ allProducts = [] }) => {
  const fallback = [
    {
      id: "f1",
      title: "Elevate Your Style",
      subtitle: "New arrivals — crafted for comfort",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=0d8c8c9d8a3c6f8c2b4a5e6f7a8b9c0d",
    },
    {
      id: "f2",
      title: "Bold & Modern",
      subtitle: "Limited edition pieces — shop the drop",
      image:
        "https://images.unsplash.com/photo-1520975912655-0c5f6f2b5b1a?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f70809182736455443322",
    },
  ];

  const slides =
    Array.isArray(allProducts) && allProducts.length ? allProducts : fallback;

  const getImg = (p) =>
    p?.image || p?.imageUrl || p?.img || p?.photo || p?.picture || null;
  const getTitle = (p) => p?.title || p?.name || "Garments Collection";
  const getSubtitle = (p) =>
    p?.price ? `$${p.price}` : p?.subtitle || "Shop the latest styles";

  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3800, disableOnInteraction: false }}
        navigation={true}
        pagination={{ clickable: true }}
        grabCursor={true}
        className="h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px]"
      >
        {slides.map((item, idx) => {
          const img =
            getImg(item) || item.image || item.imageUrl || item.photo || null;
          const title = getTitle(item);
          const subtitle = getSubtitle(item);

          return (
            <SwiperSlide key={item.id || item._id || idx}>
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0  bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('${
                      img || item.image || fallback[0].image
                    }')`,
                  }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute left-4 sm:left-8 lg:left-12 bottom-6 sm:bottom-10 lg:bottom-16 max-w-[86%] text-white">
                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base md:text-lg text-cyan-200/90">
                    {subtitle}
                  </p>

                  <div className="mt-4 flex items-center space-x-3">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-md text-sm sm:text-base font-semibold shadow-lg hover:scale-105 transition-transform"
                    >
                      Shop Now
                    </a>
                    <a
                      href="#"
                      className="hidden sm:inline-block px-3 py-2 border border-gray-300 text-gray-200 rounded-md text-sm hover:bg-gray-800/60 transition-colors"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
