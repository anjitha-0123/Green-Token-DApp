import React from 'react';

function DeviceCard({ device }) {
  const {
    deviceType,
    verified,
    timestamp,
    owner, // <- updated
  } = device;

  // Convert UNIX timestamp to readable date
  const formatDate = (ts) => {
    const date = new Date(ts * 1000); // Assuming timestamp is in seconds
    return date.toLocaleString();
  };

  return (
    <div className="bg-white  rounded-xl p-6 w-[800px] ml-[400px] m-4 border-2 border-purple-300 ">
      <h3 className="text-xl font-bold mb-2 text-purple-800">{deviceType}</h3>

      <div className="mb-2">
        <span className="font-semibold text-gray-700">Status:</span>{" "}
        <span
          className={`ml-2 font-bold px-2 py-1 rounded ${
            verified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {verified ? 'Verified' : 'Not Verified'}
        </span>
      </div>

      <div className="mb-2 text-sm text-gray-600">
        <span className="font-semibold">Added On:</span> {formatDate(timestamp)}
      </div>

      <div className="text-sm text-gray-600 break-all">
        <span className="font-semibold">Owner:</span> {owner}
      </div>
    </div>
  );
}

export default DeviceCard;

