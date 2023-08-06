import React from 'react'
import Auth from '../components/Auth'
import { account } from '../helpers/appwrite'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const LoginBtn=({onClick})=>{
    return (<button onClick={onClick} className="btn btn-primary">Login Now</button>)
} 
const Login = () => {
    //login requirements for appwrite
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();
    const loginAccount=async()=>{
        const promise = account.createEmailSession(
           email,password
        );
        promise.then(response=>{
            navigate('/')
        })
        .catch((err)=>{
            alert(err);
        });
    };
  return (
    <Auth title={"Login"} 
    description={"Continue your journey with CodeDrop"} 
    pwd={"Enter your password"} 
    button={<LoginBtn onClick={loginAccount}/>} 
    bottomQuestion={"Don't have an account?"} bottomLabel={"Create an account"}
     bottomLink={"/signup"}
       email={email}
       //   name={name}
         password={password}
         setEmail={setEmail}
         setPassword={setPassword}
         />
  );
};

export default Login;
