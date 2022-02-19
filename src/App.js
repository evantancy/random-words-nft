import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import Wallet from "./Wallet";
import Mint from "./Mint";

// this is the longer version of code below!!!
// const Body = () => {
//     return (
//         <div>
//             <p>my name jeff</p>
//         </div>
//     );
// }

const Body = () => (
    <div>
        <p>Symmetrical Pixels is a collection of ...</p>
        <Wallet />
        <Mint />
    </div>
);

const Header = () => (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
    </header>
);

const App = () => (
    <div className="App">
        <Header />
        <Body />
    </div>
);

export default App;
