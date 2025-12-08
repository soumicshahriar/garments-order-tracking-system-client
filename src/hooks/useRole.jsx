import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: role = [], isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });
  console.log(role);
  return {
    role,
    isLoading,
  };
};

export default useRole;
