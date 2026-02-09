import axios from "axios";
import { Field, Formik,ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { domain } from "../Store";
import toast from "react-hot-toast";


export default function LoginPage() {
 
    const values = { identifier: '', password: '' };
    const Schema = Yup.object({
        identifier: Yup.string().required().email(),
        password: Yup.string().required(),
    });
    const handleLogin = (values) => {
        let url = domain + '/api/auth/local';
        axios
        .post(url , values)
        .then((res)=>{
            toast.success('Login success');
            localStorage.setItem('token',res.data.jwt);
            localStorage.setItem('user', JSON.stringify(res.data.jwt));
        })
        .catch(()=>{
            toast.error('wrong email or password');
        });
        console.log(values);
    };
    return (
        <div className="w-full h-dvh flex justify-center items-center ">
            <Formik onSubmit={handleLogin} initialValues={values} validationSchema={Schema}>
                <Form className="bg-white rounded shadow border flex flex-col gap-3 p-4 w-100">
                    <h1>Please Login</h1>
                    <Field className="input w-full" name="identifier" placeholder="Please Enter Your Email" />
                    <ErrorMessage name="identifier" component={'p'} className="text-red-500"/>
                    <Field className="input w-full" type="password" name="password" placeholder="Please Enter Your Password " />
                    <ErrorMessage name="password" component={'p'} className="text-red-500"/>
                    <button className="btn btn-primary" type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    )
}
