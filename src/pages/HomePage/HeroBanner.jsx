import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useRef } from "react";
import { Link } from "react-router";
import "./HeroBanner.css";

const HeroBanner = ({ allProducts = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const swiperRef = useRef(null);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="hero-slider-container w-full px-3 sm:px-6 lg:px-0 mt-16 sm:mt-20 lg:mt-28 ">
        <section className="w-full ">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            speed={900}
            navigation={true}
            pagination={{ clickable: true }}
            grabCursor={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="h-auto"
          >
            {slides.map((item, idx) => (
              <SwiperSlide key={item.id || idx}>
                <div
                  className={`slide flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-10 py-8 px-4 sm:px-6 lg:px-12 ${
                    activeIndex === idx ? "active" : ""
                  }`}
                >
                  {/* Text Section */}
                  <div className="content text-center lg:text-left lg:ml-20 w-full lg:w-1/2">
                    <h1 className="categoryTitle text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                      {item.title}
                    </h1>

                    <p className="description text-sm sm:text-base md:text-lg text-gray-300 mb-4">
                      {item.price || item.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                      <Link
                        to={`/order-form/${item.id}`}
                        className="exploreButton text-sm sm:text-base px-5 py-2"
                      >
                        Shop Now
                      </Link>

                      <Link
                        to={`/product-details/${item.id}`}
                        className="text-sm text-cyan-200/80 underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="imageCardContainer flex items-center justify-center w-full lg:w-1/2 relative">
                    <div className="mainImageCard w-52 sm:w-64 md:w-72 lg:w-80 shadow-xl">
                      <img
                        src={item.imageMain}
                        alt={item.title}
                        className="rounded-xl object-cover w-full h-full"
                      />
                    </div>

                    <div className="peekImageCard w-28 sm:w-36 md:w-40 lg:w-48 absolute -right-4 sm:-right-8 bottom-4 opacity-70">
                      <img
                        src={item.imagePeek}
                        alt={`${item.title}-peek`}
                        className="rounded-xl object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot w-2.5 h-2.5 rounded-full transition ${
                  index === activeIndex
                    ? "bg-cyan-300 scale-125"
                    : "bg-gray-500/50"
                }`}
                onClick={() => swiperRef.current?.slideToLoop(index)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroBanner;
