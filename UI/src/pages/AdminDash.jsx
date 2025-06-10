import React, { useEffect, useState } from 'react';
import { Contract, BrowserProvider, parseEther } from 'ethers';
import GreenToken from '../assets/GreenToken.json';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const contractAddress =import.meta.env.VITE_contractAddress;
const ADMIN_WALLET =import.meta.env.VITE_ADMIN_WALLET_Address; 


function AdminDashboard() {
  const navigate=useNavigate();

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAccessAndFetch();
  }, []);
  
  const checkAccessAndFetch = async () => {
    if (!window.ethereum) return alert("MetaMask required");
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
  
    if (userAddress.toLowerCase() !== ADMIN_WALLET.toLowerCase()) {
      alert("Access denied: Admins only.");
      navigate("/")
      return;
    }
  
    fetchSubmissions();
  };
  
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    if (!window.ethereum) return alert("MetaMask required");
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, GreenToken.abi, provider);
      const submissions = await contract.getAllSubmissions();

      const formatted = submissions.map((d, index) => ({
        id: index,
        user: d.user,
        deviceType: d.deviceType,
        ipfsCID: d.ipfsCID,
        timestamp: Number(d.timestamp),
        verified: d.verified,
      }));

      setDevices(formatted);
    } catch (error) {
      console.error("Failed to fetch submissions", error);
    }
  };

  const verifyDevice = async (id) => {
    if (!window.ethereum) return alert("MetaMask required");
    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, GreenToken.abi, signer);
      const tx = await contract.verifyAndReward(id);
      await tx.wait();
      alert("Device verified and tokens minted!");
      fetchSubmissions();
    } catch (error) {
      console.error("Verification failed", error);
      alert("Verification failed. Check console.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <Navbar/>
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Admin Dashboard</h1>
      {devices.length === 0 ? (
        <p className="text-center text-gray-700">No devices found.</p>
      ) : (
        <div className="grid grid-cols-3 justify-center">
          {devices.map((device) => (
            <div key={device.id} className="bg-white shadow-lg rounded-xl p-6 w-[550px] m-4 border border-purple-300">
              
              <h3 className="text-xl font-bold mb-2 text-purple-950">{device.deviceType}</h3>
              <p className='text-red-800'><strong>Owner:</strong> {device.user}</p>

              <p className='text-purple-950'><strong>IPFS CID:</strong> {device.ipfsCID}</p>
              <p><strong>Timestamp:</strong> {new Date(device.timestamp * 1000).toLocaleString()}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`font-bold ${device.verified ? "text-green-600" : "text-red-600"}`}>
                  {device.verified ? "Verified" : "Not Verified"}
                </span>
              </p>
              {!device.verified && (
                <button
                  onClick={() => verifyDevice(device.id)}
                  className="mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Mint"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

