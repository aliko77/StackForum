import {FC} from 'react';
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import {NavLink} from "react-router-dom";
import Button from "../../components/Button";

const Login: FC = () => {
    return (
        <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
            <div className="flex items-center justify-center mb-4">
                <Logo noText/>
            </div>
            <div
                className="border rounded p-3 bg-white dark:text-gray-100 dark:bg-night-e dark:border-gray-500">
                <div>
                    <form action="#">
                        <div className="mb-3">
                            <Label htmlFor="email" value="Email"/>
                            <TextInput id={"email"} type={"text"} placeholder={"name@stack.com"}
                                       required={true}/>
                        </div>
                        <div className="mb-3">
                            <Label htmlFor="password" value="Şifre"/>
                            <TextInput id={"password"} type={"password"} placeholder={"•••••••••"}
                                       required={true}/>
                        </div>
                        <div className="flex justify-end mb-3">
                            <NavLink to="/forgot-password"
                                     className="text-sm font-medium text-rose-400 hover:underline dark:text-indigo-500">
                                Şifreni mi unuttun?
                            </NavLink>
                        </div>
                        <div>
                            <Button text={"Giriş yap"} sClass="w-full bg-rose-500 hover:bg-rose-600 dark:bg-indigo-500 dark:hover:bg-indigo-600" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;