import React, {FC} from 'react';
import Logo from "../../components/Logo";

const Login: FC = () => {
    return (
        <div className="mx-auto w-full max-w-lg p-3 sm:my-20 my-10">
            <div className="border rounded p-3 bg-white dark:text-gray-100 dark:bg-night-e dark:border-gray-200">
                <div className="flex items-center justify-center mb-4">
                    <Logo/>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default Login;