import React, { useEffect, useState } from "react";
import Whiteboard from "./components/Whiteboard.tsx";
import "./styles/App.css";
import web3 from "./web3";
import Modal from "./components/Modal.tsx";

function App() {
  const [userAccounts, setUserAccounts] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    };
    connectWallet();
  }, []);

  const handleMintNFT = () => {
    setModalMessage("Mint your NFT! (Feature coming soon)");
    setIsModalOpen(true);
  };

  const handleValidate = () => {
    setModalMessage("Validate your NFT! (Feature coming soon)");
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      <header className="hero-section">
        <h1>NFT Creator with Pixel Art</h1>
        <p>
          Use our 32x32 pixel canvas to design and mint your own NFT
          masterpiece.(Read Disclaimer!)
        </p>
      </header>
      <main className="main-content">
        <section className="whiteboard-section">
          <h2>Design Your NFT</h2>
          <h2>Account linked: {userAccounts[0]}</h2>
          <div className="whiteboard-container">
            <Whiteboard />
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
