import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { FiEdit, FiTrash2, FiUserCheck, FiUserX } from "react-icons/fi";
import { MdAdminPanelSettings, MdSupervisorAccount } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import Loader from "../../../Loader/Loader";

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
  exit: { opacity: 0, scale: 0.95 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};

const ManageUsers = () => {
  const axiosInstance = useAxios();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [batch, setBatch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchEmail, setSearchEmail] = useState("");

  const [suspendUser, setSuspendUser] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendFeedback, setSuspendFeedback] = useState("");

  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

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
    } catch {
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
    if (!window.confirm("Are you sure?")) return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      toast.success("User deleted");
      refetch();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const submitSuspension = async () => {
    if (!suspendReason) return toast.error("Select a reason");

    try {
      await axiosInstance.patch(`/users/update-status/${suspendUser._id}`, {
        status: "suspended",
        reason: suspendReason,
        feedback: suspendFeedback,
      });

      toast.success("User suspended");
      refetch();

      setSuspendUser(null);
      setSuspendReason("");
      setSuspendFeedback("");
    } catch {
      toast.error("Failed to suspend user");
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-semibold mb-6 text-gray-200"
      >
        Manage Users ({allUsers.length}) |{" "}
        <span className="text-yellow-400">Filtered: {filteredUser.length}</span>
      </motion.h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded p-2 bg-gray-700 text-gray-200"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="buyer">Buyer</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2 bg-gray-700 text-gray-200"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>

        <input
          type="text"
          placeholder="Search email..."
          className="border rounded p-2 bg-gray-800 text-gray-200"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto rounded-lg shadow-lg"
      >
        <table className="table table-zebra w-full text-gray-300">
          <thead className="bg-gray-800 text-gray-100 text-sm md:text-base">
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
            <AnimatePresence>
              {filteredUser.map((user, i) => (
                <motion.tr
                  key={user._id}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="hover:bg-gray-800/50"
                >
                  <td>{i + 1}</td>
                  <td className="font-medium">{user.name}</td>
                  <td>{user.email}</td>

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
                          <FaUserTie size={16} className="text-green-400" />
                        )}
                      </>
                    )}

                    {user.role === "buyer" && (
                      <>
                        <FiUserCheck size={16} className="text-gray-400" />
                        <span>Buyer</span>
                      </>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedUser(user)}
                      className="ml-2 hover:text-cyan-400"
                    >
                      <FiEdit size={16} />
                    </motion.button>
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

                  <td className="flex gap-2 justify-center flex-wrap">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleStatusChange(user._id, "approved")}
                      disabled={user.status === "approved"}
                      className={`btn btn-sm ${
                        user.status === "approved"
                          ? "btn-disabled"
                          : "btn-success"
                      }`}
                    >
                      <FiUserCheck />
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSuspendUser(user)}
                      disabled={user.status === "suspended"}
                      className={`btn btn-sm ${
                        user.status === "suspended"
                          ? "btn-disabled"
                          : "btn-error"
                      }`}
                    >
                      <FiUserX />
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-sm btn-warning"
                    >
                      <FiTrash2 className="text-black" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

      {/* Role Modal */}
      <AnimatePresence>
        {selectedUser && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="modal-box bg-gray-900 text-gray-200"
            >
              <h3 className="font-bold text-lg mb-4">
                Update Role for {selectedUser.name}
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedRole("admin")}
                  className={`btn w-full btn-outline ${
                    selectedRole === "admin" && "btn-success"
                  }`}
                >
                  <MdAdminPanelSettings size={20} /> Admin
                </button>

                <button
                  onClick={() => setSelectedRole("manager")}
                  className={`btn w-full btn-outline ${
                    selectedRole === "manager" && "btn-success"
                  }`}
                >
                  <MdSupervisorAccount size={20} /> Manager
                </button>

                <button
                  onClick={() => setSelectedRole("buyer")}
                  className={`btn w-full btn-outline ${
                    selectedRole === "buyer" && "btn-success"
                  }`}
                >
                  <FiUserCheck size={20} /> Buyer
                </button>

                {selectedRole === "manager" && (
                  <input
                    type="text"
                    placeholder="Batch (e.g. B12)"
                    className="input input-bordered w-full bg-gray-800"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                  />
                )}
              </div>

              <div className="modal-action justify-between">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button onClick={handleUpdateRole} className="btn btn-primary">
                  Update Role
                </button>
              </div>
            </motion.div>
          </dialog>
        )}
      </AnimatePresence>

      {/* Suspend Modal */}
      <AnimatePresence>
        {suspendUser && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="modal-box bg-gray-900 text-gray-200"
            >
              <h3 className="font-bold text-lg mb-4">
                Suspend User: {suspendUser.name}
              </h3>

              <select
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="select select-bordered w-full bg-gray-800"
              >
                <option value="">Select reason</option>
                <option value="Violation of policies">
                  Violation of policies
                </option>
                <option value="Spamming">Spamming</option>
                <option value="Fraudulent Activity">Fraudulent Activity</option>
                <option value="Non-cooperation">Non-cooperation</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                placeholder="Additional feedback..."
                rows="3"
                className="textarea textarea-bordered w-full bg-gray-800 mt-3"
                value={suspendFeedback}
                onChange={(e) => setSuspendFeedback(e.target.value)}
              ></textarea>

              <div className="modal-action justify-between">
                <button
                  onClick={() => setSuspendUser(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>

                <button onClick={submitSuspension} className="btn btn-error">
                  Suspend
                </button>
              </div>
            </motion.div>
          </dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageUsers;
