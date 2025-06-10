import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/images/logo.png'
import { Contract, BrowserProvider } from 'ethers';
import GreenToken from '../assets/GreenToken.json';
import toast, { Toaster } from 'react-hot-toast';

const contractAddress =import.meta.env.VITE_contractAddress;

function AddDevice() {
  const [deviceType, setDeviceType] = useState('');
  const [otherDeviceType, setOtherDeviceType] = useState('');
  const [ipfsCID, setIpfsCID] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const resetForm = () => {
    setDeviceType('');
    setOtherDeviceType('');
    setIpfsCID('');
    setShowOtherInput(false);
    setLoading(false);
    document.getElementById("add-device-form").reset();
  };

  const handleDeviceChange = (e) => {
    const value = e.target.value;
    setDeviceType(value);

    if (value === 'Others') {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherDeviceType('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalDeviceType = deviceType === 'Others' ? otherDeviceType.trim() : deviceType;

    if (!finalDeviceType) {
      toast.error("Please select or specify a device type.");
      return;
    }
    if (!ipfsCID) {
      toast.error("Please enter the IPFS CID.");
      return;
    }

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, GreenToken.abi, signer);

      // This triggers MetaMask confirmation popup
      const tx = await contract.addDevice(finalDeviceType, ipfsCID);
      
      toast.loading("Waiting for confirmation...");
      await tx.wait();

      toast.dismiss(); // remove loading toast
      toast.success("Successfully Added");

      resetForm();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Error submitting to smart contract.");
      setLoading(false);
    }
  };

  return (
    <div className='bg-purple-950 w-full h-[3000px]'>
      <Navbar />
      <div className='flex'>
        <img src={logo} className='w-[600px] h-[600px]' alt="Logo" />
        <form 
          id="add-device-form"
          onSubmit={handleSubmit}
          className='w-[600px] h-[500px] bg-green-200 rounded-md mt-52'
        >
          <h2 className='pt-12 pl-60 text-2xl font-bold'>Add Device</h2>

          <label className='pl-20 text-xl'>Device Type:</label>
          <select 
            value={deviceType}
            onChange={handleDeviceChange}
            disabled={loading}  // disable while loading
            className='pl-12 ml-4 mt-6 border-2 rounded-md w-72 h-8 mb-8'
          >
            <option value="">-- Select a device --</option>
            <option value="laptop">Laptop</option>
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
            <option value="Others">Others</option>
          </select>

          {showOtherInput && (
            <input
              type="text"
              value={otherDeviceType}
              onChange={(e) => setOtherDeviceType(e.target.value)}
              placeholder="Please specify"
              disabled={loading}
              className='ml-52 w-[300px] mb-4 h-10 rounded-md border-2 px-2'
            />
          )}

          <br />

          <label className='pl-20 text-xl'>IPFS CID:</label>
          <input 
            type='text' 
            value={ipfsCID}
            onChange={(e) => setIpfsCID(e.target.value)}
            placeholder="CID"
            disabled={loading}
            className='ml-12 mt-4 w-[300px] h-10 rounded-md border-2 px-2'
          />
          <br />

          <div className='flex mt-12'>
            <button 
              type='submit' 
              disabled={loading}
              className={`bg-purple-950 w-24 h-10 text-white rounded-md ml-32 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button 
              type='button' 
              onClick={resetForm} 
              disabled={loading}
              className={`bg-red-950 w-24 h-10 text-white rounded-md ml-32 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AddDevice;
