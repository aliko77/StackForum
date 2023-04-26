import React, {Component} from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter} from "react-router-dom";
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <main className="content">
                    <div>
                        Hi
                    </div>
                </main>
                <Footer/>
            </BrowserRouter>
        )
    }
}

export default App;