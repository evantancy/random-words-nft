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
            <p>
                Random Words is a collection of randomly generated words, stored
                fully on-chain.
            </p>
            <p>Price per token: free </p>
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

const App = () => {
    const TWITTER_LINK = "https://twitter.com/_buildspace";
    return (
        <div className="container">
            <Header />
            <Body />
            <div className="footer">
                built with <a href={`${TWITTER_LINK}`}>@_buildspace</a>
            </div>
        </div>
    );
};

export default App;
