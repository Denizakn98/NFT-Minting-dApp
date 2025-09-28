import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";

function App() {
  const [file, setFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [mintedTokenId, setMintedTokenId] = useState(null);

  // Replace with your preferred IPFS uploader (e.g. Infura, Pinata)
  async function uploadToIPFS(file) {
    const formData = new FormData();
    formData.append("file", file);
    // Example: Pinata API
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: "YOUR_PINATA_API_KEY",
        pinata_secret_api_key: "YOUR_PINATA_SECRET",
      },
      body: formData,
    });
    const data = await res.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  }

  async function mintNFT() {
    if (!file) return;
    const url = await uploadToIPFS(file);
    setIpfsUrl(url);
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const nft = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await nft.mintNFT(url);
      const receipt = await tx.wait();
      setMintedTokenId(receipt.logs[0].topics[3]);
      alert("NFT Minted!");
    }
  }

  return (
    <div>
      <h1>Mint Your NFT</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={mintNFT}>Mint NFT</button>
      {ipfsUrl && (
        <div>
          <p>IPFS URL: <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">{ipfsUrl}</a></p>
          <img src={ipfsUrl} alt="NFT Preview" style={{ width: 200 }} />
        </div>
      )}
      {mintedTokenId && <p>Minted Token ID: {mintedTokenId}</p>}
    </div>
  );
}

export default App;
