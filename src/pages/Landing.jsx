import React from 'react'
import {FaFileCode} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { account } from '../helpers/appwrite'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //if a person is logged in and he is still trying to access login and sign up pages, then navigate him to dashboard
    const user = account.get();
    user.then(() => {
      navigate("/");
    });
  }, [navigate]);
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://th.bing.com/th/id/OIG.NC63E8L7llVDK17pjlK7?pid=ImgGn)'}}>
    <div className="hero-overlay bg-opacity-10"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md text-white bg-black p-8 py-16 rounded-xl bg-opacity-50 backdrop-blur-sm flex flex-col gap-4">
      <FaFileCode size={108} className='mx-auto'/>
        <h1 className="mb-5 text-5xl font-bold">Code Drop</h1>
        <p >An open-source code sharing platform with amazing powers of React and AppWrite.</p>
        <Link to={"/login"} className="btn btn-primary rounded-3xl">Get Started</Link>
      </div>
    </div>
  </div>
  )
}

export default Landing
