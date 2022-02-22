import React, { useState, useContext } from "react";
import { utils } from "ethers";
import { AddressContext } from "./AddressContext";

const Wallet = () => {
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");
    const { address, setAddress } = useContext(AddressContext);

    const provider = window.ethereum;

    const connectWalletHandler = async () => {
        // provider = new ethers.providers.Web3Provider(window.ethereum);

        if (!provider) {
            alert("Get MetaMask!");
            return;
        }
        try {
            chainHandler();
            const accounts = await provider.request({
                method: "eth_requestAccounts",
            });
            accountHandler(accounts[0]);
            // unused
            setConnButtonText("Connected");
        } catch (error) {
            console.log(error);
        }
    };

    const accountHandler = (_account) => {
        setAddress(_account);
        getUserBalance(_account);
    };

    const getUserBalance = async (_address) => {
        const weiBalance = await provider.request({
            method: "eth_getBalance",
            params: [_address.toString(), "latest"],
        });
        const etherBalance = utils.formatEther(weiBalance);
        setUserBalance(etherBalance);
    };

    // reload window on changing networks
    const chainHandler = async () => {
        const RINKEBY_CHAINID = "0x4";
        const chainId = await provider.request({ method: "eth_chainId" });

        if (chainId !== RINKEBY_CHAINID) {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: RINKEBY_CHAINID }], // chainId must be in hexadecimal numbers
            });
        }
    };

    // listen for account changes
    if (provider) {
        provider.on("accountsChanged", accountHandler);
        provider.on("chainChanged", connectWalletHandler);
    }

    const renderAccountDetails = () => (
        <div className="account-details">
            <div>Address: {address}</div>
            <div>Balance: {userBalance}</div>
        </div>
    );

    const renderConnectButton = () => (
        <button className="button" onClick={connectWalletHandler}>
            {connButtonText}
        </button>
    );

    return (
        <div className="Wallet">
            {address === null ? renderConnectButton() : renderAccountDetails()}
        </div>
    );
};

export default Wallet;
