import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../../components/Textbox";
import Button from "../../components/Button";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const user = "";
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (data) => {
    console.log("Form Submitted", data);
   
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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

        {/* Right Side*/}
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
            />

            <div className="relative w-full">
              <Textbox
                placeholder="Your password"
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                className="w-full rounded-lg text-white"
                register={register("password", { required: "Password is required!" })}
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400">
              <span className="hover:text-green-400 cursor-pointer">Forgot Password?</span>
            </div>

            <Button
              type="submit"
              label="Sign In"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-cyan-400 text-black uppercase rounded-lg hover:shadow-lg transition duration-300"
            />
            {/* <div className="flex items-center text-center flex-col text-white">
              <p className="text-xl">Create an account</p>
              <a href="/sign-up" className="text-cyan-300">SignUp</a>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
