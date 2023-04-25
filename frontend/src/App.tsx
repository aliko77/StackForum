import React, {Component} from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
    render() {
        return (
            <>
                <Header/>
                <main className="content"></main>
                <Footer/>
            </>
        )
    }
}

export default App;