import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { signInUser, googleSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Sign in Successful");
      })
      .catch((error) => {
        toast.error("error.message");
      });

    // try {
    //   const response = await axios.post("/login", {
    //     email: data.email,
    //     password: data.password,
    //   });

    //   // Simulate successful login
    //   toast.success("Login successful!");
    //   navigate("/");
    // } catch (err) {
    //   const message =
    //     err?.response?.data?.message ||
    //     "Invalid email or password. Please try again.";
    //   toast.error(message);
    // }
  };

  //   google sing in
  const handleGoogleLogIn = async () => {
    try {
      const result = await googleSignIn();
      const data = result.user;

      const payload = {
        name: data.displayName,
        email: data.email,
        photoURL: data.photoURL || "",
        role: "buyer",
        status: "pending",
      };

      // Post data to backend
      const response = await axiosInstance.post("/users", payload);

      if (response.data) {
        toast.success("Login successful!");
      } else {
        toast.error("Something went wrong while creating user.");
      }
    } catch (error) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-cyan-300 text-center mb-4">
          Log in to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
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
              Log In
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleGoogleLogIn}
            className="flex items-center justify-center w-full py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-300 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-300 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
