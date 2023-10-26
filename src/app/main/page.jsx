"use client"
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Nostr from "../nostr";
import FormComent from "@/components/FormComent";
function page() {
  const [status,setStatus] = useState(true)

  const validateStatus = ()=>{
    if(status === true){
      setStatus(false)
    }else if(status ===  false){
      setStatus(true)
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <section  className="flex flex-row justify-between container mx-auto items-center mt-5 px-10 max-w-2xl bg-white rounded-lg  p-5 ">
       
          <div>
            <h1 className="text-2xl font-bold">Welcome to NostrCommentary</h1>
            <p>Write whatever you want </p>
          </div>
      
            <button className="bg-black text-white py-1 w-40 rounded-2xl hover:bg-white hover:text-black hover:border border-black" onClick={validateStatus} >
              {status === true ? <p>Make a comment</p> : <p>Close</p> }
            </button>
        
      </section>
      
      <Nostr status={status}></Nostr>
    </div>
  );
}

export default page;
