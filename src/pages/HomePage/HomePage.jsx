import React from "react";
import HeroBanner from "./HeroBanner";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import OurProducts from "./OurProducts";
import CustomerFeedback from "./CustomerFeedback";
import PartnerShip from "./PartnerShip/PartnerShip";
import Loader from "../Loader/Loader";

const HomePage = () => {
  const axiosInstance = useAxios();

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["sliderProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-products");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <HeroBanner allProducts={allProducts} isLoading={isLoading} />
      <OurProducts />
      <CustomerFeedback />
      <PartnerShip />
    </div>
  );
};

export default HomePage;
