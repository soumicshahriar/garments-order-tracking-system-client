import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  if (isLoading) return <Loader />;

  const profile = users[0];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4 text-center"
      >
        My Profile
      </motion.h2>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg"
      >
        {/* Profile Image */}
        <motion.div
          className="flex justify-center mb-4"
          whileHover="hover"
          variants={imageVariants}
        >
          <img
            src={profile?.photoURL}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-gray-700 object-cover shadow-lg"
          />
        </motion.div>

        {/* User Info */}
        <div className="space-y-3 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="text-xl font-bold"
          >
            {profile?.name}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            className="text-gray-300"
          >
            <span className="font-semibold">Email:</span> {profile?.email}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
            className={`px-3 py-1 inline-block rounded-full text-sm ${
              profile?.status === "approved"
                ? "bg-green-600"
                : "bg-yellow-500 text-black"
            }`}
          >
            {profile?.status.toUpperCase()}
          </motion.p>

          {profile.status === "suspended" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="bg-yellow-500 text-black rounded-2xl p-2"
            >
              {profile.suspendReason}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            className="text-gray-300"
          >
            <span className="font-semibold">Role:</span> {profile?.role}
          </motion.p>
        </div>

        {/* Logout Button */}
        <motion.div className="mt-6 text-center">
          <motion.button
            onClick={handleLogOut}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition"
          >
            Logout
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
