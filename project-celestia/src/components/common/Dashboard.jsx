import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiOutlineRefresh } from "react-icons/hi";
import UserCard from './UserCard';
import CharacterStrip from './CharacterStrip';
import { IoMdArrowRoundBack } from "react-icons/io";

function Dashboard() {

    const params = useParams()
    const uid = params.uid
    const navigate = useNavigate()
    

    const [emptyRanks, setEmptyRanks] = useState(false);
    const [rankItems, setRankItems] = useState();
    const [resBool, setResBool] = useState(1);
    const [cardInfo, setCardInfo] = useState();

    useEffect(()=>{
        axios.get(`http://localhost:8080/damage/rankings/${uid}`)
        .then((res)=>{
            console.log(res.data)
            setRankItems(res.data);
        })
        .catch((err)=>{
            setEmptyRanks(true);
        })
    }, [])

    useEffect(()=>{
        axios.get(`http://localhost:8080/user/dashboard/noRefresh/${uid}`)
        .then((res)=>{
            setCardInfo(res.data)
        })
        .catch((err)=>{})
    }, [])

    function reloadHandler(){
        setResBool(0)
        axios.get(`http://localhost:8080/user/dashboard/${uid}`)
        .then((res)=>{
            axios.get(`http://localhost:8080/damage/rankings/${uid}`)
            .then((res1)=>{
                setRankItems(res1.data);
            })
            .catch((err)=>{})
            setResBool(1)
            setCardInfo(res.data)
        })
        .catch((err)=>{})
    }

  return (
    <div className='w-full h-full flex'>
        <div className="flex flex-col p-5 m-5 justify-end mb-[8rem] ml-[4rem]">
            <div>
                <p className="text-9xl text-white afacad-bold">User</p>
                <p className="text-9xl text-white afacad-bold mt-[-1.5rem]">Dashboard</p>
            </div>
            {(cardInfo !== undefined)?<>
                <div className='flex'>
                    {(resBool===1)?<>
                        <div className="p-1 text-white bg-black/42 backdrop-blur-md absolute z-20 rounded-3xl 
                        ml-[25.9rem] mt-[12.5rem] flex items-center px-2 cursor-pointer
                        hover:bg-white hover:text-black transition"
                        onClick={reloadHandler}
                        >
                            <p className="afacad-semi-bold  mr-1 ">Refresh </p>
                            <HiOutlineRefresh  />
                        </div>
                    </>:<>
                        <div className="p-1 text-white bg-gray-600 ring-1 ring-[#B2B2B2] backdrop-blur-md absolute z-20 rounded-3xl 
                        ml-[25.9rem] mt-[12.5rem] flex items-center px-2 r"
                        >
                            <p className="afacad-semi-bold  mr-1 ">Refresh </p>
                            <HiOutlineRefresh  />
                        </div>
                    </>}
                    <UserCard key={cardInfo.uid + Date.now()} props={cardInfo} />
                </div>
                </>:<>
                <div className=' text-black  w-[31.5rem] h-[17rem]'>
                    <div className="z-0 bg-cover bg-center h-full w-full rounded-md bg-gray-600/42">
                        <div className=" bg-gray-800/42 backdrop-blur-xs w-[31.5rem] h-[17rem] rounded-md absolute flex justify-end">
                            <div className=" h-full w-[30rem] rounded-lg border-2 border-dashed  border-white/42">
                                <div className="flex p-[2rem] h-full items-center">
                                    <img src="https://i.pinimg.com/originals/b2/56/74/b25674410a834c3dc7bae5ea0a7b08cb.jpg" className='rounded-[100%] w-[60px] h-[60px]' />
                                    <div className="flex flex-col text-white justify-center h-full">
                                    <p className="text-4xl libre-baskerville-bold ml-4 ">User not Found!</p>
                                    <p className="text-md text-[#B2B2B2] libre-baskerville-regular ml-4">
                                        Are you sure the UID is correct?
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> }
        </div>
        
            {
                (!rankItems && emptyRanks) ? 
                <div className=' flex w-full  justify-center '>
                    <div className='  flex flex-col justify-end'>
                            <div className="bg-white/25 rounded-[12%] -mb-14 p-11 h-[65%] flex flex-col items-center">
                                
                                <p className="text-5xl afacad-bold text-white">Rankings not Found!</p>
                                <div className="flex items-center justify-center mt-3">
                                    <p className="afacad-light text-white text-2xl">Go to Builds</p>
                                    <IoMdArrowRoundBack  onClick={()=>{navigate(`/builds/${uid}`)}}
                                     className=' rotate-180 bg-white rounded-full ml-2 p-0.5 hover:bg-black hover:text-white transition' size={20}/>
                                </div>

                                
                            </div>
                    </div>
                </div> :
                <div className=' flex w-full  justify-end'>
                    <div className="flex  justify-evenly w-[75%] mr-[2.5rem] min-w-[45rem]">
                        {rankItems && <>
                            {[...rankItems].slice(0,5).map((rankItem)=>(
                                <div key={rankItem.category+rankItem.buildName} className='flex w-[18%] ' onClick={()=>{navigate(`/builds/${uid}`)}}>
                                    <CharacterStrip rankItem={rankItem}/>
                                </div>
                            ))}
                        </>}
                    </div>
                </div>
            }
            
        
    </div>
  )
}

export default Dashboard