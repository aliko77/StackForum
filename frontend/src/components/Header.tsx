import React, {Component} from "react";
import Logo from "../assets/ForumLogo.png";

class Header extends Component {
    render() {
        return (
            <header className="static bg-white border-t-4 border-rose-400 shadow py-3 px-2 sm:px-10">
                <div className="flex flex-1">
                    <div>
                        <div className="flex space-x-2 items-center">
                            <img width="36px" src={Logo} alt="Logo"/>
                            <h1 className="font-mono space-x-0.5 text-xl">
                                <span>Stack</span>
                                <span className="font-semibold">Forum</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;