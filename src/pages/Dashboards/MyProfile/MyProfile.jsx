import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const axiosInstance = useAxios();

  const navigate = useNavigate();

  const { data: users = [], isPending } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  //   handle log out
  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  if (isPending) return <Loader />;

  // logged-in account from database
  const profile = users[0];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={profile?.photoURL}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-gray-700 object-cover shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-bold">{profile?.name}</h3>

          <p className="text-gray-300">
            <span className="font-semibold">Email:</span> {profile?.email}
          </p>

          <p
            className={`px-3 py-1 inline-block rounded-full text-sm ${
              profile?.status === "approved"
                ? "bg-green-600"
                : "bg-yellow-500 text-black"
            }`}
          >
            {profile?.status.toUpperCase()}
          </p>

          <p className="text-gray-300">
            <span className="font-semibold">Role:</span> {profile?.role}
          </p>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogOut}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
