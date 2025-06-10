import React, { useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Contract, BrowserProvider } from 'ethers';
import GreenToken from '../assets/GreenToken.json';
import DeviceCard from '../components/DeviceCard';
import { WalletContext } from '../context/Walletcontext.jsx';
import Navbar from '../components/Navbar.jsx';
import logo from '../assets/images/logo.png'

const contractAddress =import.meta.env.VITE_contractAddress;

function Homepage() {
  const { walletAddress } = useContext(WalletContext);
  const [devices, setDevices] = useState([]);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchDevices() {
      if (!window.ethereum || !walletAddress) {
        alert("Please install MetaMask and connect wallet!");
        return;
      }
  
      try {
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(contractAddress, GreenToken.abi, provider);
  
        const devicesFromContract = await contract.getAllSubmissions();
  
        // Filter only the devices submitted by the connected wallet
        const filteredDevices = devicesFromContract
          .filter(device => device.user.toLowerCase() === walletAddress.toLowerCase())
          .map(device => ({
            deviceType: device.deviceType,
            verified: device.verified,
            timestamp: Number(device.timestamp),
            owner: device.user,
            ipfsCID: device.ipfsCID,
          }));
  
        setDevices(filteredDevices);
      } catch (err) {
        console.error("Failed to fetch devices:", err);
      }
    }
  
    if (walletAddress) {
      fetchDevices();
    }
  }, [walletAddress]);
  

  useEffect(() => {
    fetchBalance();
  }, [walletAddress]);
  
  const fetchBalance = async () => {
    if (!walletAddress || !window.ethereum) return;
  
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, GreenToken.abi, provider);
      const balance = await contract.balanceOf(walletAddress);
      setBalance(balance.toString());
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };

  return (
   
    <div className='bg-purple-950 w-full min-h-screen pb-20'>  
     <Navbar/>
      <div className='flex px-20'>
        <img src={logo} alt="GreenToken Logo" />
        <div className='bg-white w-[1000px] h-52 rounded-lg mt-20 ml-20 p-6'>
          <h1 className='text-3xl mb-2'>Let's Recycle</h1> 
          <p className='mb-4'>Recycle your product and earn tokens via Wallet!</p>
          <Link 
            to='/addDevice' 
            className='bg-purple-950 text-white w-40 h-12 flex items-center justify-center rounded-md'
          >
            Add your Product
          </Link>
        </div>
      </div>
      {walletAddress && (
  <div className="text-green-200 ml-24 mb-12 mt-4">
    Connected Wallet: <span className="font-mono">{walletAddress}</span><br />
    <span className="text-white">Token Balance: {balance || 'Loading...'} GT</span>
  </div>
)}


      {/* ...your other JSX */}
      <div>
        {devices.length === 0 ? (
          <p className="text-white text-center mt-10">No devices found</p>
        ) : (
          devices.map((device, index) => (
            <DeviceCard key={index} device={device} />
          ))
        )}
      </div>
    </div>
  );
}

export default Homepage;

