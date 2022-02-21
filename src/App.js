import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Wallet from "./Wallet";
import Mint from "./Mint";
import { AddressContext } from "./AddressContext";

const Body = () => {
    const [address, setAddress] = useState(null);

    return (
        <div>
            <p>Symmetrical Pixels is a collection of ...</p>
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
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
    </header>
);

const App = () => (
    <div className="container">
        <Header />
        <Body />
    </div>
);

export default App;
