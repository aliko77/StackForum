import React, {FC} from "react";
import HelloWorld from "./pages/Home";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

const App: FC = () => {
    return (
        <BrowserRouter>
            <Route>
                <Link to="/">Home</Link>
            </Route>
        </BrowserRouter>
    );
};

export default App;
