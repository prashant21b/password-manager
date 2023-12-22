import React from 'react'
import toast from 'react-hot-toast';
export const Card = ({item,onDelete}) => {
  const handleCopyClick = () => {
    window.navigator.clipboard.writeText(item.password);
    toast.success("Copy to Clipboard",{
    position: "top-right"});
  };
  
  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-4">{item.password}</p>

      <div className="flex justify-between">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300 ease-in-out"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleCopyClick}
        >
          Copy Password
        </button>
      </div>
    </div>
  )
}
