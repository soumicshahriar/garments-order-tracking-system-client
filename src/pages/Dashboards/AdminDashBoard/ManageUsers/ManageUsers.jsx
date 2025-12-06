import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { FiEdit, FiUserCheck, FiUserX } from "react-icons/fi";
import { MdAdminPanelSettings, MdSupervisorAccount } from "react-icons/md";
import { FaUserTie } from "react-icons/fa"; // batch icon
import toast from "react-hot-toast";
import Loader from "../../../Loader/Loader";

const ManageUsers = () => {
  const axiosInstance = useAxios();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [batch, setBatch] = useState("");

  // Fetch all users
  const {
    data: allUsers = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
  }

  const handleUpdateRole = async () => {
    if (!selectedRole) return toast.error("Please select a role");

    try {
      const payload =
        selectedRole === "manager"
          ? { role: selectedRole, batch }
          : { role: selectedRole, batch: "" };

      await axiosInstance.patch(
        `/users/update-role/${selectedUser._id}`,
        payload
      );

      toast.success(`Updated role to ${selectedRole}`);
      refetch();
      setSelectedUser(null);
      setSelectedRole("");
      setBatch("");
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosInstance.patch(`/users/update-status/${id}`, { status });
      toast.success(`User ${status}`);
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-200">
        Manage Users
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table table-zebra w-full text-gray-300">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-800/60">
                <td>{index + 1}</td>
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>

                {/* Role + Batch Icon + Edit */}
                <td className="flex items-center gap-2 capitalize">
                  {user.role === "admin" && (
                    <>
                      <MdAdminPanelSettings
                        size={18}
                        className="text-yellow-400"
                      />
                      <span>Admin</span>
                    </>
                  )}
                  {user.role === "manager" && (
                    <>
                      <MdSupervisorAccount
                        size={18}
                        className="text-cyan-400"
                      />
                      <span>Manager</span>
                      {user.batch && (
                        <FaUserTie
                          size={16}
                          className="text-green-400 ml-1"
                          title={`Batch: ${user.batch}`}
                        />
                      )}
                    </>
                  )}
                  {user.role === "buyer" && (
                    <>
                      <FiUserCheck size={16} className="text-gray-400" />
                      <span>Buyer</span>
                    </>
                  )}

                  {/* Edit icon */}
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="ml-2 text-gray-300 hover:text-cyan-400"
                    title="Edit Role"
                  >
                    <FiEdit size={16} />
                  </button>
                </td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "approved"
                        ? "badge-success"
                        : user.status === "suspended"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Approve/Suspend */}
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleStatusChange(user._id, "approved")}
                    disabled={user.status === "approved"} // disable if already approved
                    className={`btn btn-sm flex items-center gap-1 ${
                      user.status === "approved"
                        ? "btn-disabled cursor-not-allowed"
                        : "btn-success"
                    }`}
                    title="Approve"
                  >
                    <FiUserCheck size={16} />
                  </button>

                  <button
                    onClick={() => handleStatusChange(user._id, "suspended")}
                    disabled={user.status === "suspended"} // disable if already suspended
                    className={`btn btn-sm flex items-center gap-1 ${
                      user.status === "suspended"
                        ? "btn-disabled cursor-not-allowed"
                        : "btn-error"
                    }`}
                    title="Suspend"
                  >
                    <FiUserX size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role + Batch Modal */}
      {selectedUser && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-gray-900 text-gray-200">
            <h3 className="font-bold text-lg">
              Update Role for {selectedUser.name}
            </h3>

            <div className="mt-4 space-y-4">
              {/* Select Role Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedRole("admin")}
                  className={`btn btn-outline w-full flex items-center gap-2 ${
                    selectedRole === "admin" && "btn-success"
                  }`}
                >
                  <MdAdminPanelSettings size={20} /> Admin
                </button>

                <button
                  onClick={() => setSelectedRole("manager")}
                  className={`btn btn-outline w-full flex items-center gap-2 ${
                    selectedRole === "manager" && "btn-success"
                  }`}
                >
                  <MdSupervisorAccount size={20} /> Manager
                </button>

                <button
                  onClick={() => setSelectedRole("buyer")}
                  className={`btn btn-outline w-full flex items-center gap-2 ${
                    selectedRole === "buyer" && "btn-success"
                  }`}
                >
                  <FiUserCheck size={20} /> Buyer
                </button>
              </div>

              {/* Batch input only for manager */}
              {selectedRole === "manager" && (
                <div>
                  <label className="block mb-1">Batch</label>
                  <input
                    type="text"
                    placeholder="Enter batch (e.g., B12)"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              )}
            </div>

            <div className="modal-action flex justify-between">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>

              <button className="btn btn-primary" onClick={handleUpdateRole}>
                Update Role
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageUsers;
