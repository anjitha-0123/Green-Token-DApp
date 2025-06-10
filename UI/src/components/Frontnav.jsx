import React, { useContext,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import { toast } from 'react-toastify';
import { WalletContext } from '../context/Walletcontext.jsx'; // Fix casing


function Frontnav() {
  const navigate = useNavigate();
  const { setWalletAddress } = useContext(WalletContext); // ✅ get context setter

  async function handleWallet() {
    if (!window.ethereum) {
      toast.warning("Please install MetaMask.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address); // ✅ store in context
      toast.success(`${address} connected to MetaMask successfully!`);
      navigate("/Homepage");
    } catch (error) {
      toast.error("Wallet connection failed!");
      console.error(error);
    }
  }

 
  useEffect(() => {
    if (!window.ethereum) return;
  
    const handleAccountsChanged = (accounts) => {
      setWalletAddress(accounts[0] || null);
      if (!accounts[0]) {
        toast.info("Disconnected from MetaMask");
        navigate("/");
      }
    };
  
    window.ethereum.on('accountsChanged', handleAccountsChanged);
  
    // 🧹 Cleanup
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);
  
  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-end gap-12 items-center p-6 text-green-200 bg-purple-950">

      <Link to="/" className="hover:underline">HOME</Link>
      <Link to="/about" className="hover:underline">ABOUT US</Link>
      <button 
        onClick={handleWallet} 
        className="bg-green-900 w-48 h-10 rounded-md hover:bg-green-700"
      >
        Connect to Wallet
      </button>
    </nav>
  );
}

export default Frontnav;
