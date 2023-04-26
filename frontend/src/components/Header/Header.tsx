import React, {Component} from "react";
import Logo from "../Logo";
import Button from "../Button";

class Header extends Component {
    render() {
        return (
            <header className="static bg-white border-t-4 border-rose-400 shadow py-3 px-2 sm:px-10">
                <div className="flex items-center align-center">
                    <div>
                        <Logo/>
                    </div>
                    <div className="ml-auto">
                        <div className="flex flex-1 space-x-2">
                            <div>
                                <Button sClass="bg-rose-500 hover:bg-rose-600 text-white" text="Giriş yap" onClick={
                                    () => {
                                    }
                                }/>
                            </div>
                            <div>
                                <Button sClass="bg-indigo-500 hover:bg-indigo-600 text-white" text="Kayıt ol" onClick={
                                    () => {
                                    }
                                }/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;