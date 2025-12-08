import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import Loader from "../../../Loader/Loader";
import useAxios from "../../../../hooks/useAxios";

const TrackOrders = () => {
  const axiosInstance = useAxios();
  const { orderId } = useParams();

  const { data: orderData = {}, isPending } = useQuery({
    queryKey: ["trackOrder", orderId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/orders/${orderId}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;

  const tracking = orderData?.tracking || [];
  const latestStepIndex = tracking.length - 1;

  return (
    <div className="p-4 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6">
        Order Tracking — {orderData?._id}
      </h2>

      {/* ======================= */}
      {/* Animated Timeline */}
      {/* ======================= */}
      <div className="relative space-y-6 pl-10">
        {/* vertical line */}
        <div className="absolute left-5 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-700 opacity-40 rounded-full"></div>

        {tracking?.length === 0 && (
          <p className="text-gray-400">No tracking updates yet.</p>
        )}

        {tracking.map((step, i) => {
          const isLatest = i === latestStepIndex;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* dot */}
              <motion.div
                className={`w-4 h-4 rounded-full absolute left-4 top-2 shadow-lg
                  ${isLatest ? "bg-blue-400 scale-125" : "bg-gray-600"}
                `}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15, type: "spring" }}
              />

              {/* card */}
              <motion.div
                className={`p-4 ml-8 rounded-lg border shadow-md bg-gray-800 
                  ${isLatest && "border-blue-500 shadow-blue-500/30"}
                `}
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-lg font-bold text-blue-300">{step.status}</p>

                <p className="text-sm">{step.location}</p>

                {step.note && (
                  <p className="text-gray-300 text-sm mt-1">{step.note}</p>
                )}

                {step.image && (
                  <img
                    src={step.image}
                    alt="step"
                    className="w-32 mt-2 rounded border border-gray-700"
                  />
                )}

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(step.time).toLocaleString()}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ======================= */}
      {/* Map Section */}
      {/* ======================= */}
      {/* <div className="mt-10">
        <h3 className="text-xl font-bold mb-3">Live Location</h3>

        <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300">
          🚚 Map Placeholder (Google Maps / Leaflet can be added here)
        </div>
      </div> */}
    </div>
  );
};

export default TrackOrders;
