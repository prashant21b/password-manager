
import { useState,useCallback, useEffect,useRef } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from "react-icons/fa";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useSavedArray } from '../context/SavedArrayContext';
function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {savedArray, setSavedArray } = useSavedArray();
const navigate=useNavigate();
  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);
  const[title,setTitle]=useState("");
  const [savedPassword,setSavedPassword]=useState("")

  const savedPasswordHandler = () => {
    if (title.trim() === "" || savedPassword.trim() === "") {
      toast.error("Both the field are required",{
        position:"top-right"
      })
      return;
    }
    setSavedArray((prevArray) => [
      ...prevArray,
      {
        title: title,
        password: savedPassword,
      },
    ]);
    toast.success("Password saved sucessfully",{
      position:"top-right"
    })
   
    setTitle("");
    setSavedPassword("");
    closeModal();
  };
 
  useEffect(() => {
    if (savedArray.length > 0) {
      localStorage.setItem("savedArray", JSON.stringify(savedArray));
    }
  }, [savedArray]);
  
  
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [Password,setPassword]=useState("")
  const passwordRef=useRef()
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  
  if(numberAllowed) str+="0123456789";
  if(charAllowed) str+="!@#$%^&*_-+=[]{}~`";
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1);
    pass=pass+str.charAt(char)
  
  }
  setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);

  useEffect(()=>{
    Modal.setAppElement('#root');
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
window.navigator.clipboard.writeText(Password);
toast.success("Copy to Clipboard",{
position: "top-right"});
  },[Password]);

  
  return (
    
      <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500  items-center">
    <h1 className='text-white text-center my-3'>Password generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
      />
      <button
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >copy</button>
      
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={6}
      max={100}
      value={length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
            setNumberAllowed((prev) => !prev);
        }}
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
                setCharAllowed((prev) => !prev )
            }}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
    
  </div>
  
</div>
<div className="flex items-center gap-x-1 mx-auto max-w-md">
  <button onClick={()=>navigate('/savedPassword')}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
    
  >
    Saved Password
  </button>
</div>
<div
        className="bg-white p-4 rounded-full absolute bottom-4 right-4 mb-4 mr-4 hover:cursor-pointer"
        onClick={openModal} 
      >
        <FaPlus className="text-3xl text-blue-500" />
      </div>

      
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Example Modal" 
  className="modal fixed w-1/2 inset-1/2 transform -translate-x-1/2 -translate-y-1/2" 
  overlayClassName="overlay" 
>
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-center">Save Password</h2>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titleInput">
        Title:
      </label>
      <input
        id="titleInput"
        type="text"
        value={title}
        className="w-full px-3 py-2 border rounded"
        placeholder="Enter title"
        onChange={(e)=>setTitle(e.target.value)}
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordInput">
        Password:
      </label>
      <input
        id="passwordInput"
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="Enter password"
        value={savedPassword}
        onChange={(e)=>setSavedPassword(e.target.value)}
      />
    </div>
    <div className="flex justify-end">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={savedPasswordHandler}
      >
        Save
      </button>
      <button
        className="bg-gray-400 text-white px-4 py-2 rounded"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  </div>
</Modal>
</>
  );
}

export default Home;
