import React, { useState, useContext, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import artifacts from "./saved_artifacts/artifacts.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddressContext } from "./AddressContext";

const Mint = () => {
    const { address } = useContext(AddressContext);
    const [mintAmount, setMintAmount] = useState(1);

    const CONTRACT_ADDRESS = "0x23bC2BeE10F8BDba5359F18dbA8d6E83b3067Bb8";
    const RINKEBY_URL = "https://rinkeby.etherscan.io";

    // let currentSupply;
    // let maxSupply;

    const toastOptions = {
        autoClose: 30000,
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark",
        hideProgressBar: true,
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
            const tx = await contract.mint(mintAmount);
            toast(
                <a
                    href={`${RINKEBY_URL}/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View your transaction
                </a>,
                toastOptions
            );
            // wait to be mined
            await tx.wait();
            // currentSupply = await contract.currentSupply();
            // maxSupply = await contract.maxSupply();
        } catch (error) {
            console.log(error);
        }
    };

    const renderMintButton = () => (
        <div>
            <button className="button" onClick={callMint}>
                Mint
            </button>
            <ToastContainer />
        </div>
    );

    const renderQuantityButton = () => (
        <div>
            <button
                className="button-small"
                onClick={() => setMintAmount(mintAmount - 1)}
            >
                -
            </button>
            {mintAmount}
            <button
                className="button-small"
                onClick={() => setMintAmount(mintAmount + 1)}
            >
                +
            </button>
        </div>
    );

    // const renderMintProgress = async () => {
    //     return (
    //         <div>
    //             <p>
    //                 {currentSupply.toString()} / {maxSupply.toString()} minted
    //             </p>
    //         </div>
    //     );
    // };

    return (
        <div className="Mint">
            {/* {address === null ? "" : renderMintProgress()} */}
            {address === null ? "" : renderQuantityButton()}
            {address === null ? "" : renderMintButton()}
        </div>
    );
};

export default Mint;
