import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function User() {

  return (
    <div className='flex w-full h-full items-center text-white justify-around'>
        <div className="afacad-bold  mr-1 ml-[-5rem] h-full">
            <div className=" rounded-2xl h-full flex items-center">
                <SignedIn>
                    <div className="flex flex-col  bg-gray-600/10 backdrop-blur-md ring-1 ring-gray-300/35 rounded-2xl">
                        <p className='p-5 text-7xl pr-[10rem] pl-[2rem]'>Instructions</p>
                        <div className="ring-1 mx-11 rounded-2xl mt-[-0.5rem] ring-amber-400"></div>
                        <ol className="p-2 text-3xl mx-10 mb-4">
                            <li>Instructions here</li>
                            <li>Instructions here</li>
                            <li>Instructions here</li>
                            <li>Instructions here</li>
                            <li>Instructions here</li>
                            <li>Instructions here</li>
                        </ol>
                    </div>
                </SignedIn>
            </div>
            <SignedOut>
                    <div className="h-full flex justify-center items-center">
                        <div className="  flex flex-col  bg-gray-600/10 backdrop-blur-md ring-1 ring-gray-300/35 rounded-2xl">
                        <p className='p-5 text-8xl pr-[10rem] pl-[2rem] mb-1'>Sign In</p>
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