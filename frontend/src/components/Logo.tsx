import React, {FC} from 'react';
import StackLogo from "../assets/images/ForumLogo.png";

const Logo: FC = () => {
    return (
        <div className="flex space-x-2 items-center">
            <img width="36px" src={StackLogo} alt="Logo"/>
            <h1 className="font-mono space-x-0.5 text-xl">
                <span>Stack</span>
                <span className="font-semibold">Forum</span>
            </h1>
        </div>
    );
}

export default Logo;