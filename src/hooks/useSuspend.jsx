import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useSuspend = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: status = [], isLoading } = useQuery({
    queryKey: ["user-status", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}/suspend`);
      return res.data.status;
    },

    // 🔥 LIVE UPDATE EVERY 3 SECONDS
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });
  console.log(status);
  return {
    status,
    isLoading,
  };
};

export default useSuspend;
