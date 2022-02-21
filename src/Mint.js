import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import artifacts from "./artifacts/artifacts.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddressContext } from "./AddressContext";

const Mint = () => {
    const { address } = useContext(AddressContext);

    const CONTRACT_ADDRESS = "0x67aB2c0a6164Fc65458497fa806DC5E35F5bB1b6";
    const RINKEBY_URL = "https://rinkeby.etherscan.io";

    const toastOptions = {
        autoClose: 30000,
        position: toast.POSITION.BOTTOM_LEFT,
    };

    const callMint = async () => {
        if (!window.ethereum) {
            return;
        }
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                artifacts.abi,
                signer
            );

            // call Solidity mint function
            let tx = await contract.mint();
            // wait to be mined
            let receipt = await tx.wait();

            notifyMintTx(receipt, toastOptions);
        } catch (error) {
            console.log(error);
        }
    };

    const notifyMintTx = (_receipt) => {
        toast(
            <a
                href="{RINKEBY_URL}/tx/{_receipt.transactionHash}"
                target="_blank"
                rel="noopener"
            >
                View your transaction
            </a>,
            toastOptions
        );
    };

    const renderMintButton = () => (
        <div>
            <button onClick={callMint}>Mint</button>
            <ToastContainer />
        </div>
    );

    return (
        <div className="Mint">{address === null ? "" : renderMintButton()}</div>
    );
};

export default Mint;
