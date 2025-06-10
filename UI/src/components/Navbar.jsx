import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WalletContext } from '../context/Walletcontext.jsx';

function Navbar() {
  const { walletAddress, connectWallet, disconnectWallet } = useContext(WalletContext);
  const navigate = useNavigate();

  const adminAddress =import.meta.env.VITE_ADMIN_WALLET_Address; 
  const isAdmin = walletAddress?.toLowerCase() === adminAddress.toLowerCase();

  const handleDisconnect = () => {
    disconnectWallet();    
    navigate('/');          
  };

  return (
    <div className='flex pl-[900px] pt-6 text-green-200'>
      <Link to='/Homepage' className='ml-62'>HOME</Link>
      {isAdmin && (
        <Link to='/admin' className='ml-12'>ADMIN DASH</Link>
      )}
      {walletAddress ? (
        <>
          <span className="ml-12 text-sm text-green-300">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          <input
            type='button'
            value="Disconnect"
            onClick={handleDisconnect}
            className='ml-6 bg-green-900 w-40 h-10 rounded-md cursor-pointer'
          />
        </>
      ) : (
        <input
          type='button'
          value="Connect Wallet"
          onClick={connectWallet}
          className='ml-32 bg-green-900 w-40 h-10 rounded-md cursor-pointer'
        />
      )}
    </div>
  );
}

export default Navbar;
