import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Login = () => {

  const {backendURL, navigate} = useContext(AppContext)

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const handleSubmit = async () => {
    try {
      const response = await axios(`${backendURL}/api/auth/login`, );
      if (response.ok) {   
        navigate('/')
      } else {
        console.log('error in api');
        
      }
      // console.log(response);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-300">
      <div className="bg-white p-6 rounded-md shadow-lg w-[30%] shadow-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6 uppercase">Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex flex-col gap-2">
              <label className="block text-lg font-medium">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full text-md p-2 border outline-none rounded-md focus:ring focus:ring-gray-200"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2 pt-8 pb-5">
              <label className="block text-lg font-medium">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full text-md p-2 border outline-none rounded-md focus:ring focus:ring-gray-200"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="pb-4">
              <Link to={"/forget-password"} className="hover:text-blue-500">
                Forget password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition-all"
            >
              Login
            </button>

            <Divider />

            <div className="flex items-center justify-center gap-2 pt-5">
              <p>Not a Member?</p>
              <Link
                to={"/signin"}
                className="underline text-blue-500 hover:text-black"
              >
                SignIn
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
