import React, { useEffect, useState } from 'react';
import { FaFileCode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { account } from '../helpers/appwrite';
const Dashboard = () => {
  const [name,setName]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    const user=account.get();
    user.then((response)=>{
      setName(response.name);
    })
    .catch((err)=>{
      navigate("/landing");
    });
  },[navigate]);
  return (
  
     <div className="min-h-screen flex flex-col items-center justify-center text-primary-content text-center gap-4 p-4">
     <FaFileCode size={108} className='mx-auto'/>
        <h1 className="mb-5 text-5xl font-bold">Hello, {name} 👋🏻</h1>
        <p >Start by creating/opening a new CodeDrop.</p>
     </div>
  
  );
};

export default Dashboard;
