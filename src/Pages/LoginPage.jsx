import axios from "axios";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { domain } from "../Store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const redirectTo =
        localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectTo, { replace: true });
    }
  }, []);

  const initialValues = { identifier: "", password: "" };
  const validationSchema = Yup.object({
    identifier: Yup.string().required().email("Enter a valid email"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values, { setSubmitting }) => {
    axios
      .post(domain + "/api/auth/local", values)
      .then((res) => {
        toast.success("Login successful!");
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        const redirectTo =
          localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectTo, { replace: true });
      })
      .catch(() => {
        toast.error("Wrong email or password");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome 
          </h1>
          <p className="text-center text-gray-500">
            Please login to continue to your checkout
          </p>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Email</label>
            <Field
              name="identifier"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white text-black placeholder-gray-400"
            />
            <ErrorMessage
              name="identifier"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white text-black placeholder-gray-400"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition"
          >
            Login
          </button>

          {/* Signup link */}
          <p className="text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <span className="text-primary font-medium cursor-pointer">
              Sign Up
            </span>
          </p>
        </Form>
      </Formik>
    </div>
  );
}
