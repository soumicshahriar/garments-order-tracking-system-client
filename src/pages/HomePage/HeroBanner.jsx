import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useState, useRef } from "react";
import "./HeroBanner.css";
import { Link } from "react-router";

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

  // -------------------------------
  // 🔥 Apply map here only
  // -------------------------------
  const slides =
    Array.isArray(allProducts) && allProducts.length
      ? allProducts
          .filter((p) => p.showOnHome) // Only products for homepage
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
    <div className="hero-slider-container max-w-7xl mx-auto mt-20">
      <section className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
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
              <div className={`slide ${activeIndex === idx ? "active" : ""}`}>
                <div className="content text-center">
                  <h1 className="categoryTitle">{item.title}</h1>
                  <p className="description">{item.price}</p>
                  <div>
                    <Link
                      to={`/order-form/${item.id}`}
                      className="exploreButton"
                    >
                      Shop Now
                    </Link>
                    <Link
                      to={`/product-details/${item.id}`}
                      className="ml-3 text-sm text-cyan-200/80  sm:inline-block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="imageCardContainer">
                  <div className="mainImageCard">
                    <img src={item.imageMain} alt={item.title} />
                  </div>
                  <div className="peekImageCard">
                    <img src={item.imagePeek} alt={`${item.title}-peek`} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="navigationDots" aria-hidden>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? "dotActive" : ""}`}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
