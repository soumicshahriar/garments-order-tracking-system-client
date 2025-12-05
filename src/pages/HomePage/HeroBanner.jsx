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

  // -------------------------------
  // 🔥 Apply map here only
  // -------------------------------
  const slides =
    Array.isArray(allProducts) && allProducts.length
      ? allProducts
          .filter((p) => p.showOnHome) // Only products for homepage
          .map((p) => ({
            id: p._id,
            title: p.title,
            subtitle: `$${p.price}`,
            image: p.images?.[0] || fallback[0].image,
          }))
      : fallback;

  return (
    <div className="max-w-7xl mx-auto mt-15">
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
          {slides.map((item, idx) => (
            <SwiperSlide key={item.id || idx}>
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                  }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute left-4 sm:left-8 lg:left-12 bottom-6 sm:bottom-10 lg:bottom-16 text-white">
                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base md:text-lg text-cyan-200/90">
                    {item.subtitle}
                  </p>

                  <div className="mt-4 flex items-center space-x-3">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 rounded-md text-sm sm:text-base font-semibold shadow-lg hover:scale-105"
                    >
                      Shop Now
                    </a>
                    <a
                      href="#"
                      className="hidden sm:inline-block px-3 py-2 border border-gray-300 text-gray-200 rounded-md hover:bg-gray-800/60"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default HeroBanner;
