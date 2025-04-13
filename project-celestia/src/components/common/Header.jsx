import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SignInComponent from './Validate'

function Header() {

    const {isLoaded, isSignedIn, user} = useUser();

    const navigate = useNavigate();
    const {uid} = useParams();

  return (
    <div className=' w-full h-full'>
        <div className='bg-black w-full p-3 py-[2rem]'>
            <div className="bg-black flex justify-between">
                <Link to='/'>
                    <div className="flex">
                        <p className='afacad-bold text-white text-[4rem] mt-[-1.6rem] ml-[0.7rem]'>Re<span className='text-amber-400'>:</span>muria</p>
                    </div>
                </Link>

                <div className='text-white'>
                    <ul className='flex'>
                        {uid && 
                            <li className='p-1 m-1' onClick={()=>{navigate(`builds/${uid}`)}}>Builds</li>
                        }
                        {uid && 
                            <li className='p-1 m-1' onClick={()=>{navigate(`artifacts/${uid}`)}}>Artifacts</li>
                        }
                        {uid && 
                            <li className='p-1 m-1' onClick={()=>{navigate(`dashboard/${uid}`)}}>Dashboard</li>
                        }
                        <li className='p-1 m-1' onClick={()=>{navigate(`leaderboards`)}}>Leaderboards</li>
                        <li className='p-1 m-1' onClick={()=>{navigate(`settings`)}}>Settings</li>
                        <SignedIn>
                            <li className="p-1 m-1">
                                    <Link to='user/validate'>
                                        Validate
                                    </Link>
                            </li>
                        </SignedIn>
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

                                    <Link to='user' className='ring-2 rounded-[6px] px-3 py-1 ring-amber-400 bg-gradient-to-br from-gray-800 to-gray-950 hover:bg-gradient-to-tl from-gray-800 to-gray-950'>
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