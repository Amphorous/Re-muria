import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function User() {

  return (
    <div className='flex w-full h-full items-center text-white justify-around'>
        <div className="afacad-bold  mr-1  h-full">
        <SignedIn>
            <div className=" rounded-2xl h-full flex items-center max-w-[19rem]">
                
                    <div className="flex flex-col  bg-gray-600/10 backdrop-blur-md ring-1 ring-gray-300/35 rounded-2xl">
                        <p className='p-5 text-7xl pr-[10rem] pl-[2rem]'>Instructions</p>
                        <div className="ring-1 mx-11 rounded-2xl mt-[-0.5rem] ring-amber-400"></div>
                        <ol className="p-2 text-xl mx-10 mb-4 afacad-light">
                            <li>1) Click <span className='text-amber-400'>Reload</span> to generate your Verification Code</li>
                            <li>2) Copy the Verification code and paste it in your <span className='ml-5'>game's, <span className='text-amber-400'>Edit -> Edit Signature</span></span>  </li>
                            <li>3) Log out of the game </li>
                            <li>4) Press Validate. If failed, <span className='text-amber-400'>wait 60 seconds</span> and retry. </li>
                        </ol>
                    </div>
                
            </div>
        </SignedIn>
        <SignedOut>
                    <div className="h-full flex justify-center items-center">
                        <div className="  flex flex-col   ">
                            <p className='p-5 text-[1500%]  mb-1'>Sign</p>
                            <p className='p-5 text-[1500%] mt-[-12rem]  mb-1'>In</p>
                        </div>
                    </div>
        </SignedOut>
        </div>
        <div className='ml-1 flex flex-col'>
            <Outlet/>
        </div>

    </div>
  )
}

export default User