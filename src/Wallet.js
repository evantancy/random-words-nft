import React, { useState } from "react";
import { utils } from "ethers";

const Wallet = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");

    const provider = window.ethereum;

    const connectWalletHandler = async () => {
        // provider = new ethers.providers.Web3Provider(window.ethereum);
        if (provider) {
            const accounts = await provider.request({
                method: "eth_requestAccounts",
            });
            accountHandler(accounts[0]);
            const chainId = await provider.request({ method: "eth_chainId" });
            if (chainId !== "0x4") {
                setErrorMessage("Not on Rinkeby!");
            }

            setConnButtonText("Connected");
        } else {
            setConnButtonText("Not Connected");
            setErrorMessage("Install MetaMask");
        }
    };

    const accountHandler = (_account) => {
        setDefaultAccount(_account);
        getUserBalance(_account.toString());
    };

    const getUserBalance = async (_address) => {
        const weiBalance = await provider.request({
            method: "eth_getBalance",
            params: [_address, "latest"],
        });
        const etherBalance = utils.formatEther(weiBalance);
        setUserBalance(etherBalance);
    };

    // reload window on changing networks
    const chainHandler = (_chainId) => {
        // window.location.reload();
        setErrorMessage("Not on the Rinkeby network!");
    };

    // listen for account changes
    provider.on("accountsChanged", accountHandler);
    provider.on("chainChanged", chainHandler);

    return (
        <div className="Wallet">
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div>Address: {defaultAccount}</div>
            <div>Balance: {userBalance}</div>
            <div>{errorMessage}</div>
        </div>
    );
};

export default Wallet;
