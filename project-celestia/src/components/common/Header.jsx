import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import SignInComponent from './Validate'
import axios from 'axios';
import { remurianContextObj } from '../../contexts/RemurianContext';
import { canvasContextObj } from '../../contexts/CanvasContext';

function Header() {

    const {isLoaded, isSignedIn, user} = useUser();

    const location = useLocation();
    const [locationString, setLocationString] = useState("");
    const {remurian, setRemurian} = useContext(remurianContextObj);
    const navigate = useNavigate();
    const {uid} = useParams();
    const {canvasBool, setCanvasBool} = useContext(canvasContextObj)

    useEffect(()=>{
        setLocationString(location.pathname);
    }, [location.pathname])

    useEffect(
        ()=>{
            if(user){
                setRemurian((prev)=>{
                  return {...prev, username: user?.username}
                });
            }
        }, [isLoaded]
    )

    useEffect(()=>{
        let res = null
          axios.get(`http://localhost:8080/login/getRemurian/${remurian.username}`)
          .then((response)=>{
            res = response
            setRemurian((prev)=>{
              let updated = {
                ...prev,
                username: res.data.username,
                hashcode: res.data.hashcode,
                uid: (res.data.uid === null)?([]):(res.data.uid)
              };
              return updated;
            })
          })
          .catch((err)=>{console.log(err)})
    }, [remurian.username])

    useEffect(()=>{
        setCanvasBool(()=>{
            let storedCanvasBool = JSON.parse(localStorage.getItem('canvasBool'))
            if(storedCanvasBool){
                return storedCanvasBool;
            }
            return false;
        })
    }, [])

    

  return (
    <div className=' w-full h-full'>
        <div className='bg-black w-full p-3 py-[2rem]'>
            <div className="bg-black flex justify-between">
                <Link to='/'>
                    <div className="flex items-center">
                        <p className='afacad-bold text-white text-[4rem] mt-[-1.6rem] ml-[0.7rem]'>Re<span className='text-amber-400'>:</span>muria</p>
                        {(locationString !== "") && <div className="afacad-light text-white flex items-center text-[1.5rem] mb-1 ml-1">
                            {locationString.split('/').map((word, index)=>(
                                <div key={index}>
                                    <p>{word}<span className='text-amber-400'>/</span></p>
                                </div>

                            ))}
                        </div>}
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

                                    <Link to='user' className='ring-2 rounded-[6px] px-3 py-1 ring-amber-400 bg-gradient-to-br from-gray-800 to-gray-950 hover:bg-gradient-to-tl hover:from-gray-800 hover:to-gray-950'>
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