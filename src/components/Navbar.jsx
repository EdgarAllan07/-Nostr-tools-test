"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
function Navbar() {
  const navigate =  useRouter()
  useEffect(()=>{
   if(!localStorage.getItem("pubkey")){
      toast.error("error")
      return navigate.push("/")
   }
  },[])

  return (
    <>
      
<nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="#" className="flex items-center">
      <span className="self-center text-4xl font-bold whitespace-nowrap dark:text-white">Nostr</span>
  </a>
  <div className="flex md:order-2">
      <button type="button" className="text-white bg-black hover:bg-white hover:border border-black hover:text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600" onClick={()=>{
        localStorage.removeItem("pubkey")
        return navigate.push("/")
      }}>Log out</button>
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
