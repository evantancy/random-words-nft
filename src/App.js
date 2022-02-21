import logo from "./assets/logo.png";
import "./css/App.css";
import React, { useState } from "react";
import Wallet from "./Wallet";
import Mint from "./Mint";
import { AddressContext } from "./AddressContext";

const Body = () => {
    const [address, setAddress] = useState(null);

    return (
        <div>
            <AddressContext.Provider value={{ address, setAddress }}>
                <Wallet />
                <Mint />
            </AddressContext.Provider>
        </div>
    );
};

const Header = () => (
    <header className="header">
        <img src={logo} className="logo" alt="logo" />
    </header>
);

const App = () => (
    <div className="container">
        <Header />
        <Body />
    </div>
);

export default App;
