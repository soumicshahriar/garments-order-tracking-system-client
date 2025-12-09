import React from "react";
import HeroBanner from "./HeroBanner";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import OurProducts from "./OurProducts";
import CustomerFeedback from "./CustomerFeedback";
import PartnerShip from "./PartnerShip/PartnerShip";

const HomePage = () => {
  const axiosInstance = useAxios();

  const { data: allProducts = [] } = useQuery({
    queryKey: ["sliderProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-products");
      return res.data;
    },
  });

  return (
    <div>
      <HeroBanner allProducts={allProducts} />
      <OurProducts />
      <CustomerFeedback />
      <PartnerShip />
    </div>
  );
};

export default HomePage;
