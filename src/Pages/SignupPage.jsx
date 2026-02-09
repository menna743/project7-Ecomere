import axios from "axios";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { domain } from "../Store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "", confirmPassword: "" };
  const Schema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required").min(6, "Minimum 6 characters"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm your password"),
  });

  const handleSignup = (values) => {
    const { email, password } = values;
    axios.post(domain + "/api/auth/local/register", { username: email, email, password })
      .then((res) => {
        toast.success("Signup successful!");
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        const redirect = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirect);
      })
      .catch(() => toast.error("Signup failed! Email might be already used."));
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center bg-gray-100 px-4">
      <Formik initialValues={initialValues} validationSchema={Schema} onSubmit={handleSignup}>
        <Form className="bg-white rounded-2xl shadow-xl border p-6 w-full max-w-md flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Create an Account</h1>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Email</label>
            <Field name="email" placeholder="Enter your email" className="input input-bordered w-full bg-white text-black placeholder-gray-400" />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Password</label>
            <Field type="password" name="password" placeholder="Enter password" className="input input-bordered w-full bg-white text-black placeholder-gray-400" />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Confirm Password</label>
            <Field type="password" name="confirmPassword" placeholder="Confirm password" className="input input-bordered w-full bg-white text-black placeholder-gray-400" />
            <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
          </div>

          <button type="submit" className="w-full py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition">Sign Up</button>

          <p className="text-gray-600 text-sm text-center">
            Already have an account? <span className="text-primary cursor-pointer" onClick={() => navigate("/login")}>Login</span>
          </p>
        </Form>
      </Formik>
    </div>
  );
}
