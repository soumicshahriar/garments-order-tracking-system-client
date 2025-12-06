import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

// Register page: uses react-hook-form for validation and react-hot-toast for feedback
const Register = () => {
  const { createUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  //   const navigate = useNavigate();
  //   const axios = useAxios();

  const onSubmit = async (data) => {
    // Ensure status default is 'pending'
    const payload = {
      name: data.name,
      email: data.email,
      photoURL: data.photoURL || "",
      role: data.role,
      status: "pending",
    };

    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("user created successful");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });

    // add data to the firebase

    // try {
    //   // Try to save the user to backend (if available)
    //   await axios.post("/users", payload);
    //   // Show success toast and redirect to login
    //   toast.success("Account created successfully! Please login.");
    //   reset();
    //   navigate("/login");
    // } catch (err) {
    //   // If backend not available or error, still notify user clearly
    //   const message =
    //     err?.response?.data?.message || err.message || "Registration failed";
    //   toast.error(message);
    // }
  };

  // Custom password validator to provide specific error messages
  const validatePassword = (value) => {
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    if (value.length < 6) return "Password must be at least 6 characters long";
    return true;
  };

  return (
    <div className=" flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-cyan-300 text-center mb-4">
          Create an account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Photo URL
            </label>
            <input
              {...register("photoURL")}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Role</label>
            <select
              {...register("role", { required: true })}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                {...register("password", { validate: validatePassword })}
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-3.5 text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-linear-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg hover:scale-[1.01] transition-all"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
