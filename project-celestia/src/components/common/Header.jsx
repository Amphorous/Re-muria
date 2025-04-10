import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SignInComponent from './SignInComponent'

function Header() {

    const {isLoaded, isSignedIn, user} = useUser();

    useEffect(
        ()=>{
            console.log(user?.username)
        }, [isLoaded]
    )

  return (
    <div className=' w-full h-full'>
        <div className='bg-black w-full p-3 py-[2rem]'>
            <div className="bg-black flex justify-between">
                <div className="flex">
                    <p className='afacad-bold text-white text-[4rem] mt-[-1.6rem] ml-[0.7rem]'>Re<span className='text-amber-400'>:</span>muria</p>
                </div>

                <div className='text-white'>
                    <ul className='flex'>
                        <li className='p-1 m-1'>Artifacts</li>
                        <li className='p-1 m-1'>Leaderboards</li>
                        <li className='p-1 m-1'>Privacy</li>
                        <li className='p-1 m-1'>Settings</li>
                        <li className="p-1 m-1">
                            <div>
                                <SignedIn>
                                    <UserButton appearance={{

                                        elements: {
                                            userButtonAvatarBox: "w-15 h-15 ring-2 ring-amber-400 ", 
                                            
                                        },

                                    }}/>
                                </SignedIn>
                                <SignedOut>

                                    <Link to='signin'>
                                        Sign In
                                    </Link>
                                </SignedOut>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header