import { FC, useState } from "react";
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import { useNavigate } from "react-router";
import authSlice from "../../store/slices/auth";
import { login } from "../../services/auth";
import Alert from "../../components/Alert";
import { createAsyncThunk } from "@reduxjs/toolkit";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Geçersiz e-mail adresi")
        .required("*Zorunlu alan"),
    password: Yup.string().required("*Zorunlu alan"),
});

const Login: FC = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        const response = await login(email, password);
        // axios
        //     .post(`/auth/login/`, {
        //         email,
        //         password,
        //     })
        //     .then((res) => {
        //         dispatch(
        //             authSlice.actions.setAuthTokens({
        //                 accessToken: res.data.access,
        //                 refreshToken: res.data.refresh,
        //             })
        //         );
        //         dispatch(authSlice.actions.setAccount(res.data.user));
        //         navigate("/");
        //     })
        //     .catch((err) => {
        //         setMessage(err.response.data.detail.toString());
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    };

    const LoginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            handleLogin(values.email, values.password);
        },
    });

    return (
        <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
            <div className="flex items-center justify-center mb-4">
                <Logo noText />
            </div>
            <div className="border rounded p-3 bg-white dark:text-gray-100 dark:bg-night-e dark:border-gray-500">
                <div>
                    {message && (
                        <div className="flex w-full flex-col gap-2 space-y-1.5 mb-2">
                            <Alert color="rose">{message}</Alert>
                        </div>
                    )}
                    <form onSubmit={LoginForm.handleSubmit}>
                        <div className="mb-3">
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                id={"email"}
                                type={"email"}
                                placeholder={"name@stack.com"}
                                required={true}
                                value={LoginForm.values.email}
                                onChange={LoginForm.handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <Label htmlFor="password" value="Şifre" />
                            <TextInput
                                id={"password"}
                                type={"password"}
                                placeholder={"•••••••••"}
                                required={true}
                                value={LoginForm.values.password}
                                onChange={LoginForm.handleChange}
                                autoComplete="true"
                            />
                        </div>
                        <div className="flex justify-end mb-3">
                            <NavLink
                                to="/forgot-password"
                                className="text-sm font-medium text-rose-400 hover:underline dark:text-indigo-500"
                            >
                                Şifreni mi unuttun?
                            </NavLink>
                        </div>
                        <div>
                            <Button
                                text={"Giriş yap"}
                                sClass="w-full bg-rose-500 hover:bg-rose-600 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                type="submit"
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
