import {Outlet} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Layout = () => {
    return (
        <>
            <Header/>
            <main className="content dark:bg-night">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
};

export default Layout;
