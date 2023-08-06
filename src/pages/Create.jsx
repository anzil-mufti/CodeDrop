import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';
import { FaAsterisk, FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { addcodeDropToDB } from '../helpers/appwrite';
import { useOutletContext } from 'react-router-dom';
const Create = () => {
    const [codeDrop, setCodeDrop]=useState("")
    const [title, setTitle]=useState("")
    const [loading,setLoading]=useState(false)
    const [isPublic, setIsPublic] = useState(false);
    const [setFetchingCD]=useOutletContext();
    const navigate=useNavigate()
    //creating a database function
    const createCodeDrop=async(e)=>{
       e.preventDefault(); //loading behavior will stop
       setLoading(true)
       const response=await addcodeDropToDB({
        title:title,
        codeDrop:codeDrop,
        isPublic:isPublic
       });
       if(!response){
        alert("Unable to create CodeDrop, Please try again or try logging in again.");
        setLoading(false)
        return
       }
      setLoading(false)
      setFetchingCD(true)
      navigate('/')
    }
  return (
   
   <form onSubmit={createCodeDrop} className="min-h-screen w-full flex flex-col p-4 py-16 gap-4 lg:py-4">
   <h1 className="text-3xl">Create a CodeDrop</h1>
  <div className="form-control gap-2">
  {/* //to bring title and * on the same line using flex */}
    <label htmlFor="title" className="flex"> 
    Title <FaAsterisk size={6} className="mt-1" color="red"/>
    </label>
    <input type="text" 
    id="title" 
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    required
    className="input border-white bg-base-200 max-w-lg"/>
  </div>
  <div className="form-control gap-2">
    <label htmlFor="CodeDrop" className="flex">
    CodeDrop  <FaAsterisk size={6} className="mt-1" color="red"/>
    </label>
    <MDEditor 
     value={codeDrop} 
     onChange={setCodeDrop}
     id="CodeDrop"
     //by giving  input required, our validation will work
     required 
     preview="edit" 
     height={400}
     visibleDragbar={false} //doesnt allows to increase/decrease the size of coding area
     />
      </div>
      <div className="form-control flex-row gap-2">
        <input
          value={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          type="checkbox"
          id="publicToggle"
          className="toggle"
        />
        <label htmlFor="publicToggle">
          Do you want to make this CodeDrop public?
        </label>
      </div>
      {/* dono buttons same line m laane ke lie using flex gap 4 */}
      <div className="grid grid-cols-2 max-w-xs gap-4"> 
      {/* to avoid saving an empty codedrop , use disabled  */}
        <button disabled={!codeDrop} className={'btn btn-success ${loading?"loading":""}'}><FaSave/>Save</button>
        <button onClick={()=>navigate("/")} className= "btn btn-error"><TiCancel size={22}/>Cancel</button>
      </div>
    </form>
  
  );
};

export default Create;
