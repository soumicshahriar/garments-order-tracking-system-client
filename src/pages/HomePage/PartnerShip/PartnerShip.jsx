import React from "react";
import Marquee from "react-fast-marquee";

const PartnerShip = () => {
  const logos = [
    "/logos/zara.png",
    "/logos/hm.png",
    "/logos/cos.png",
    "/logos/brandy-melville.png",
    "/logos/gucci.png",
    "/logos/puma.png",
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto ">
      <div className="w-full bg-gray-900  py-10 border-x rounded-xl my-10">
        <h2 className="text-center text-xl font-semibold text-gray-200 mb-6">
          Our Trusted Partners
        </h2>

        <Marquee speed={60} pauseOnHover={true} gradient={false}>
          {logos.map((logo, index) => (
            <div key={index} className="mx-10 flex items-center">
              <img
                src={logo}
                alt="partner logo"
                className="h-16 w-30 border rounded bg-white object-contain "
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default PartnerShip;
