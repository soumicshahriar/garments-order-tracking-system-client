import React from "react";
import HeroBanner from "./HeroBanner";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const HomePage = () => {
  const axiosInstance = useAxios();

  const { data: allProducts = [] } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-products");
      return res.data;
    },
  });

  console.log(allProducts);

  return (
    <div>
      <HeroBanner allProducts={allProducts}></HeroBanner>
    </div>
  );
};

export default HomePage;
