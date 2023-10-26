"use client"
import React, { useState } from 'react'
import { EventTemplate, getEventHash, getPublicKey, signEvent } from 'nostr-tools'
import { RELAYS } from '@/app/nostr'

function FormComent({pool,status}) {
  const [input,setInput] = useState("")

  const onSubmit = async(e)=>{
    e.preventDefault()
    
    if(!window.nostr){
      alert("Nostr extension not found, please install it ")
      return;
    }

    //construct the event object 
    const _baseEvent= {
      content:input,
      created_at: Math.round(Date.now()/1000),
      kind: 1,
      tags: [['t','nostr']],
    }

    //sign this events (allow the user to sign it with their private key)
    //check if the user has a nostr extension
    try{
      const pubkey =  await window.nostr.getPublicKey()
      const sig = await (await window.nostr.signEvent(_baseEvent)).sig
      const event = {
        ..._baseEvent,
        sig,
        pubkey,
        id:getEventHash({..._baseEvent,pubkey})
      }

      const pub= pool.publish(RELAYS,event)
      let clearedInput=false

      pub.on("ok",()=>{
        if(clearedInput) 
        return

      clearedInput = true
        setInput("")
      });
    }
    catch(error){
      console.error(error)
    }
    //get the user pubkey
    //prompt the user the event 


    //publish the event to relay
  }

  return (
    <div hidden={status} className='container mx-auto text-black justify-center items-center bg-white  mb-3 max-w-4xl px-2 rounded-lg'>
      <form onSubmit={onSubmit}>
        <textarea placeholder="Write your note here or what's in your mind  "
        className=' w-full text-lg   rounded bg-black text-white mt-2 focus:border-violet-500 focus:border-3 outline-none focus:border-2 border-violet-500 resize-none '
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        rows={6}></textarea>
        <div className='flex justify-end'>
          <button className='bg-violet-500 px-16 py-4 rounded-md font-bold hover:bg-violet-600 active:scale-90 mb-2'>
            Publish
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormComent
