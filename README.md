# 🌿🪙 GreenToken DApp

**GreenToken** is a decentralized e-waste recycling platform that rewards users with tokens for submitting recyclable electronic devices. Built using **Ethereum**, **React**, and **IPFS**, this dApp promotes sustainable behavior through transparent and secure smart contract interactions.

---

## 🚀 Features

- ♻️ **Submit Recyclable Devices**  
  Users can submit electronic waste with proof (image) to contribute to environmental sustainability.

- 🔐 **Blockchain Integration**  
  All submissions and rewards are stored on the Ethereum blockchain to ensure immutability and transparency.

- 🎁 **Earn GreenTokens**  
  Verified submissions reward users with GreenTokens (GT), which are tracked in their connected wallets.

- 🧾 **IPFS for Proof Storage**  
  Uploaded images or documents are stored on pinata IPFS for decentralized and tamper-proof storage.

- 👥 **Multi-User Support**  
  Each user sees only their own submissions and token balances.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Smart Contracts:** Solidity, Hardhat  
- **Blockchain Network:** Ethereum (Sepolia Testnet)  
- **Storage:** IPFS via Pinata  
- **Wallet:** MetaMask  
- **Smart Contract Interaction:** Ethers.js  

---

## 🧪 How It Works

1. 🔗 Connect your MetaMask wallet.
2. ➕ Submit an e-waste device with a image file  as proof.
3. 📦 File is uploaded to IPFS.
4. 🧾 Data is sent to the smart contract and stored immutably.
5. ✅ Once verified, GreenTokens are transferred to your wallet.
6. 👀 Can view submissions and token balance on the homepage.

---

## 📸 Screenshots



---

## 🧑‍💻 Setup & Installation

1. **Clone the repository:**
```
git@github.com:anjitha-0123/Ethereum_Project.git

```
2.  **Terminal Commands to Run**

```
cd Hardhat
npm install
npx hardhat compile
npx hardhat node
npx hardhat ignition deploy ignition/modules/GreenToken.js --network sepolia
```
```
cd UI
npm run dev
```
