import logo from "./assets/logo.png";
import openseaLogo from "./assets/opensea-logo.svg";
import etherscanLogo from "./assets/etherscan-logo.svg";
import "./css/App.css";
import React, { useState } from "react";
import Wallet from "./Wallet";
import Mint from "./Mint";
import { AddressContext, ChainContext } from "./Context";

const Body = () => {
    // share states between Wallet.js and Mint.js
    const [address, setAddress] = useState(null);
    const [chainId, setChainId] = useState(null);

    return (
        <div>
            <p>
                Random Words is a collection of randomly generated words, stored
                fully on-chain.
            </p>
            <p>Price per token: free </p>
            <AddressContext.Provider value={{ address, setAddress }}>
                <ChainContext.Provider value={{ chainId, setChainId }}>
                    <Wallet />
                    <Mint />
                </ChainContext.Provider>
            </AddressContext.Provider>
        </div>
    );
};

const Header = () => (
    <header className="header">
        <img src={logo} className="logo" alt="logo" />
    </header>
);

const Links = () => {
    const CONTRACT_ADDRESS = "0x28446ba6fb0d8d0f0728576bdd7fb18b360030a5";
    const RINKEBY_URL = "https://rinkeby.etherscan.io";
    const TESTNET_URL =
        "https://testnets.opensea.io/collection/random-words-gt0ei5sin3";

    return (
        <div className="links">
            <a href={`${TESTNET_URL}`} target="_blank" rel="noreferrer">
                <img
                    src={openseaLogo}
                    className="link-logo"
                    alt="opensea link"
                ></img>
            </a>
            <a
                href={`${RINKEBY_URL}/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={etherscanLogo}
                    className="link-logo"
                    alt="etherscan link"
                ></img>
            </a>
        </div>
    );
};

const App = () => {
    const TWITTER_LINK = "https://twitter.com/nat_nave";
    return (
        <div className="container">
            <Header />
            <Body />
            <div className="footer">
                built by <a href={`${TWITTER_LINK}`}>@nat_nave</a>
                <Links />
            </div>
        </div>
    );
};

export default App;
