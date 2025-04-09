import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Textbox from "../../components/Textbox";
import Button from "../../components/Button";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slice/app/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../../redux/slice/authSlice";
import Loading from "../../components/Loader";

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Login failed!");
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d0d2b] to-[#130f40] p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center shadow-xl backdrop-blur-lg bg-white/10 rounded-xl p-6 sm:p-8 border border-white/20">
        {/* Left Side */}
        <div className="hidden md:flex flex-col items-center text-center text-white w-1/2 p-4">
          <p className="text-sm sm:text-lg border border-gray-300 rounded-full px-3 py-1">
            Organize your tasks effortlessly!
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-4 bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">
            Task Manager
          </h1>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-4 sm:p-6">
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-white">
              Welcome Back!
            </h2>
            <p className="text-center text-gray-300 text-xs sm:text-sm">
              Your credentials are encrypted.
            </p>

            <Textbox
              placeholder="email@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-lg text-white"
              register={register("email", { required: "Email is required!" })}
              error={errors.email?.message}
              autoComplete="email"
            />

            <div className="relative w-full">
              <Textbox
                placeholder="Your password"
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                className="w-full rounded-lg text-white"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password?.message}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400">
              <span className="hover:text-green-400 cursor-pointer">
                Forgot Password?
              </span>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Sign In"
                className="w-full py-2 bg-gradient-to-r from-green-500 to-cyan-400 text-black uppercase rounded-lg hover:shadow-lg transition duration-300"
              />
            )}

            <div className="flex items-center text-center flex-col text-white">
              <p className="text-xl">Create an account</p>
              <Link to="/signup" className="text-cyan-300 pt-1 text-xl underline">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
