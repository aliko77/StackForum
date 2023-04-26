import React, {FC} from 'react';
import StackLogo from "../assets/images/ForumLogo.png";
import {Link} from "react-router-dom";

const Logo: FC = () => {
    return (
        <Link to="/">
            <div className="flex space-x-2 items-center">
                <img width="36px" src={StackLogo} alt="Logo"/>
                <h1 className="font-mono space-x-0.5 text-xl dark:text-gray-100">
                    <span>Stack</span>
                    <span className="font-semibold">Forum</span>
                </h1>
            </div>
        </Link>
    );
}

export default Logo;