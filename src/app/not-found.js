import React from 'react'
import Link from 'next/link'

function NotFound() {
  return (
    <div className='container mx-auto '> 
      

    <div className='flex justify-center item-center '>   
      <div className='mt-40'>
      <h1 className='text-white text-center font-bold text-4xl '>
          Not found page
      </h1>
        <div className='flex justify-center'>
        <Link href="/" className='text-white my-4 font-semibold hover:text-violet-500 hover:underline decoration-violet-500'>Return</Link>
        </div>
      </div>

    </div>
    </div>
  )
}

export default NotFound
