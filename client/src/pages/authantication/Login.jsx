import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {AppContext} from '../../context/AppContext'

const Login = () => {
  const navigate = useNavigate();
  const {backendURL} = useContext(AppContext)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          `${backendURL}/api/auth/login`,
          values,
          { withCredentials: true }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          toast.success("Login successful");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            {...formik.getFieldProps("email")}
            margin="normal"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...formik.getFieldProps("password")}
            margin="normal"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Login</Button>
        </form>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body1">Not a Member? <Link to="/signup" style={{ color: "blue" }}>Sign Up</Link></Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;