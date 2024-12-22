//@ts-expect-error missing 
import React, { useEffect, useState } from "react";
import Whiteboard from "./components/Whiteboard.tsx";
import "./styles/App.css";
import web3 from "./web3";
import Modal from "./components/Modal.tsx";
import SqNFT from './SqNFT.ts';

function App() {
  const [userAccounts, setUserAccounts] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [gridString, setGridString] = useState<string>("0".repeat(32 * 32)); 
  const [tokenId, setTokenId] = useState<string>(""); // Token ID input state
  const [tokenData, setTokenData] = useState<string | null>(null); // Fetched token data

  useEffect(() => {
    const connectWallet = async () => {
      let userAccount: string[] = [];
      try {
        userAccount = await web3!.eth.getAccounts();
      } catch (e) {
        window.alert(
          "Error Connecting to User's Wallet, Please have some kind of provider in your browser, like MetaMask!"
        );
        console.log(e);
        return;
      }
      if (userAccount.length === 0) {
        window.alert(
          "No accounts found in the wallet, Please connect a wallet with at least one account"
        );
        return;
      }
      window.alert("Connected to User's Wallet");
      setUserAccounts(userAccount);
      // console.log(SqNFT);
    };
    connectWallet();
  }, []);

  const handleMintNFT = async () => {
    console.log("Creating NFT with grid:", gridString);
    setModalMessage("Creating NFT! (Feature coming soon)");
    try {
      const receipt = await SqNFT.methods.createNFT(gridString).send({ from: userAccounts[0], gas: '2000000' });
      const tokenId = receipt!.events!.NFTCreated.returnValues.tokenId;
      console.log(tokenId);
      setModalMessage(`NFT Created! Token ID: ${tokenId}`);
    } catch (error) {
      console.error(error);
      setModalMessage("Error while creating NFT!, The NFT Might Already Exist!");
    }
    setIsModalOpen(true);
  };


  const handleValidate = async () => {
    if(!tokenId){
      setModalMessage("Please Enter TokenId Also!");
      setIsModalOpen(true);
      return;
    }
    try{
      const check = await SqNFT.methods.validateNFT(tokenId, gridString).send({ from: userAccounts[0], gas: '2000000' });
      console.log(check);
      setModalMessage("A NFT with given tokenID exists");
      setIsModalOpen(true);
    }
    catch(e){
      setModalMessage("No NFT Exists with this TokenId and drawing");
      setIsModalOpen(true);
      console.log(e);
    }
  };

  const handleFetchNFT = async () => {
    if (!tokenId) {
      setModalMessage("Please enter a valid Token ID!");
      setIsModalOpen(true);
      return;
    }

    try {
      const data:string = await SqNFT.methods.getNFT(tokenId).call();
      setTokenData(data);
      console.log(data)
    } catch (error) {
      console.error(error);
      setModalMessage("Error fetching NFT data!");
      setIsModalOpen(true);
    }
  };

  const renderGrid = (data: string) => {
    const gridSize = 32; // Assuming 32x32 grid
    const grid = Array.from({ length: gridSize }, (_, rowIdx) => (
      <div key={rowIdx} className="grid-row">
        {data
          .slice(rowIdx * gridSize, (rowIdx + 1) * gridSize)
          .split("")
          .map((cell, colIdx) => (
            <div
              key={colIdx}
              className={`grid-cell ${cell === "1" ? "black" : "white"}`}
            ></div>
          ))}
      </div>
    ));
    return <div className="grid-container">{grid}</div>;
  };

  return (
    <div className="app">
      <header className="hero-section">
        <h1>NFT Creator with Pixel Art</h1>
        <p>
          Use our 32x32 pixel canvas to design and mint your own NFT
          masterpiece. (Read Disclaimer!)
        </p>
      </header>
      <main className="main-content">
        <section className="whiteboard-section">
          <h2>Design Your NFT</h2>
          <h2 className="Account">Account linked: {userAccounts[0]}</h2>
          <div className="whiteboard-container">
            <Whiteboard onGridStringChange={setGridString} />
          </div>
        </section>
        <section className="action-buttons">
          <button onClick={handleMintNFT} className="secondary-button">
            Create NFT
          </button>
          <button onClick={handleValidate} className="secondary-button red">
            Validate NFT
          </button>
        </section>
        <section className="nft-fetch-section">
          <h3>Fetch NFT Data</h3>
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter Token ID"
            className="token-input"
          />
          <button onClick={handleFetchNFT} className="primary-button">
            Fetch NFT
          </button>
          {tokenData && (
            <>
              <h4>Fetched NFT Grid:</h4>
              {renderGrid(tokenData)}
            </>
          )}
        </section>
      </main>
      <footer className="app-footer">
        <p>
          Disclaimer: This is a Toy app and these NFTs mean nothing, they don't
          even follow the ERC-721 and ERC-1155 standards.
        </p>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          text={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
