import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import artifacts from "./saved_artifacts/artifacts.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddressContext, ChainContext } from "./Context";
import { MerkleTree } from "merkletreejs";

const Mint = () => {
    const { address } = useContext(AddressContext);
    const { chainId, setChainId } = useContext(ChainContext);
    const [mintAmount, setMintAmount] = useState(1);

    const CONTRACT_ADDRESS = "0x28446ba6fb0d8d0f0728576bdd7fb18b360030a5";
    const RINKEBY_URL = "https://rinkeby.etherscan.io";
    const RINKEBY_CHAINID = "0x4";

    // let currentSupply;
    // let maxSupply;

    const toastOptions = {
        autoClose: 30000,
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark",
        hideProgressBar: true,
    };

    const whitelisted = [
        "0x92668e1E6Bbf1e7681A178FCcC144B99298bBA6a",
        "0xCd64F8daDe506A89f617B7056e4539996e74983f",
        "0x7E91f48Cb65642d55dc2e8cF2B21be3b50a7Ba9f",
        "0x49B5AF99714EEdF8B6CA10e7d31Dc2c712f2d23d",
    ];

    const leafNodes = whitelisted.map((addr) => ethers.utils.keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, ethers.utils.keccak256, {
        sortPairs: true,
    });
    const rootHash = merkleTree.getRoot().toString("hex");
    console.log("Merkle root", rootHash);

    const callMint = async () => {
        if (!window.ethereum) return;
        if (chainId !== RINKEBY_CHAINID) {
            alert("Switch to Rinkeby network!");
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
            let tx;
            if (contract.presaleActive()) {
                const hashedAddress = ethers.utils.keccak256(address);
                const proof = merkleTree.getProof(hashedAddress);
                tx = await contract.mintPresale(mintAmount, proof);
            } else if (contract.saleActive()) {
                tx = await contract.mintPublic(mintAmount);
            } else {
                console.log("Mint not active");
            }

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
