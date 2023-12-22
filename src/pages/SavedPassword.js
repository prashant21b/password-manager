// SavedPassword.js
import React,{useEffect} from 'react';
import { Card } from '../components.js/Card';
import { useSavedArray } from '../context/SavedArrayContext';

export const SavedPassword = () => {
  const { savedArray, setSavedArray } = useSavedArray();

  const handleDelete = (index) => {
    
    const updatedCards = savedArray.filter((_, i) => i !== index);
    setSavedArray(updatedCards);
    const storedData = JSON.parse(localStorage.getItem("savedArray")) || [];
  const updatedData = storedData.filter((_, i) => i !== index);
  localStorage.setItem("savedArray", JSON.stringify(updatedData));

  };
  useEffect(() => {
    const storedPassword = localStorage.getItem("savedArray");
    if (storedPassword) {
      setSavedArray(JSON.parse(storedPassword));
    }
  }, [setSavedArray]);
 
  return (
    <>
      <h1 style={{ textAlign: "center", color: "white", marginTop: "10px" }}>My Saved Password</h1>
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        {savedArray.map((item,index) => (
          <Card key={index} item={item} onDelete={() => handleDelete(index)} />
        ))}
      </div>
    </>
  );
};
