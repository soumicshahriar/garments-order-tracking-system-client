import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { FiEdit, FiTrash2, FiUserCheck, FiUserX } from "react-icons/fi";
import { MdAdminPanelSettings, MdSupervisorAccount } from "react-icons/md";
import { FaUserTie } from "react-icons/fa"; // batch icon
import toast from "react-hot-toast";
import Loader from "../../../Loader/Loader";

const ManageUsers = () => {
  const axiosInstance = useAxios();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [batch, setBatch] = useState("");

  //   filtering state
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // search users
  const [searchEmail, setSearchEmail] = useState("");

  // suspend user
  const [suspendUser, setSuspendUser] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendFeedback, setSuspendFeedback] = useState("");

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

  //   filtered user
  const filteredUser = allUsers.filter((user) => {
    const roleMatch = roleFilter === "all" || user.role === roleFilter;
    const statusMatch = statusFilter === "all" || user.status === statusFilter;
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchEmail.toLowerCase());
    return roleMatch && statusMatch && emailMatch;
  });

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

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      toast.success("User deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // handle suspend
  const submitSuspension = async () => {
    if (!suspendReason) return toast.error("Select a suspend reason");

    try {
      await axiosInstance.patch(`/users/update-status/${suspendUser._id}`, {
        status: "suspended",
        reason: suspendReason,
        feedback: suspendFeedback,
      });

      toast.success("User suspended successfully");
      refetch();

      // reset modal
      setSuspendUser(null);
      setSuspendReason("");
      setSuspendFeedback("");
    } catch (error) {
      toast.error("Failed to suspend user");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-200">
        Manage Users : ({allUsers.length}) ||{" "}
        <span className="text-yellow-400">
          Filtered User: ({filteredUser.length})
        </span>
      </h2>

      {/* Filter */}
      <div className="flex gap-10 my-10">
        {/* Role filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border-r-4 border-l-4 rounded p-1 bg-gray-700 text-base"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="buyer">Buyer</option>
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-r-4 border-l-4 rounded p-1 bg-gray-700 text-base"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="suspend">Suspend</option>
        </select>

        {/* Search Email */}
        <input
          type="text"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="input input-bordered bg-gray-800 text-gray-200 w-64"
        />
      </div>

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
            {filteredUser.map((user, index) => (
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
                  {/* btn approve */}
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

                  {/* button suspend */}
                  <button
                    onClick={() => setSuspendUser(user)}
                    disabled={user.status === "suspended"}
                    className={`btn btn-sm flex items-center gap-1 ${
                      user.status === "suspended"
                        ? "btn-disabled cursor-not-allowed"
                        : "btn-error"
                    }`}
                    title="Suspend"
                  >
                    <FiUserX size={16} />
                  </button>

                  {/* btn for delete */}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-sm btn-warning flex items-center gap-1"
                    title="Delete User"
                  >
                    <FiTrash2 size={16} className="text-black" />
                  </button>
                </td>
              </tr>
            ))}

            {filteredUser.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No Users found.
                </td>
              </tr>
            )}
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

      {/* Suspend Modal */}
      {suspendUser && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-gray-900 text-gray-200">
            <h3 className="font-bold text-lg">
              Suspend User: {suspendUser.name}
            </h3>

            <div className="mt-4 space-y-4">
              {/* Reason Select */}
              <div>
                <label className="block font-medium mb-1">Suspend Reason</label>
                <select
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  className="select select-bordered w-full bg-gray-800"
                >
                  <option value="">-- Select Reason --</option>
                  <option value="Violation of policies">
                    Violation of policies
                  </option>
                  <option value="Spamming">Spamming</option>
                  <option value="Fraudulent Activity">
                    Fraudulent Activity
                  </option>
                  <option value="Non-cooperation">Non-cooperation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Feedback Field */}
              <div>
                <label className="block font-medium mb-1">
                  Additional Feedback
                </label>
                <textarea
                  className="textarea textarea-bordered w-full bg-gray-800"
                  placeholder="Write details..."
                  value={suspendFeedback}
                  onChange={(e) => setSuspendFeedback(e.target.value)}
                  rows={3}
                ></textarea>
              </div>
            </div>

            <div className="modal-action flex justify-between">
              <button
                className="btn btn-outline"
                onClick={() => setSuspendUser(null)}
              >
                Cancel
              </button>

              <button className="btn btn-error" onClick={submitSuspension}>
                Suspend User
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageUsers;
