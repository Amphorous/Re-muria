import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { GrSearch } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';

function Home() {

  const [localUsers, setLocalUsers] = useState(() => {
    try {
      const stored = localStorage.getItem("localUsers");
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const navigate = useNavigate();
  const [cardBool, setCardBool] = useState(2);
  const [resBool1, setResBool1] = useState(1);
  const [cardInfo, setCardInfo] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();

  function submitHandler(formObj) {
    console.log("called")
    let uid = formObj.uid;

    setResBool1(0);

    axios.get(`http://localhost:8080/user/dashboard/noRefresh/${uid}`)
      .then((res) => {
        console.log("This is the response: ", res)
        setCardInfo(res.data);
        let userObjLS = {
          uid: res.data.uid,
          nickname: res.data.nickname,
          signature: res.data.signature,
          region: res.data.region,
          profilePictureLink: res.data.profilePictureLink
        }
        setCardBool(1)

        setLocalUsers((prevUsers) => {
          const userExists = prevUsers.some(user => user.uid === userObjLS.uid);
          let updatedUsers;

          if (userExists) {
            // Replace existing user
              updatedUsers = prevUsers.map(user =>
              user.uid === userObjLS.uid ? userObjLS : user
            );
          } else {
            // Add new user
            updatedUsers = [...prevUsers, userObjLS];
          }
          
          let updated = [...updatedUsers.slice(-8)]
          localStorage.setItem("localUsers", JSON.stringify(updated));
          return updated;

        });

        setResBool1(1);
      })
      .catch((err) => {
        setResBool1(1);
        setCardInfo(undefined);
        setCardBool(0);
      })
  }

  function regionRenderer(region){
    switch(region){
      case "ASIA":return(<p className="afacad-bold text-black rotate-90 bg-[#FDF628] rounded-sm px-1.5 ">{region}</p>)
      case "EU":return(<p className="afacad-bold text-black rotate-90 bg-[#285AFD] rounded-sm px-1.5 ">{region}</p>)
      case "CN":return(<p className="afacad-bold text-black rotate-90 bg-[#FD4428] rounded-sm px-1.5 ">{region}</p>)
      case "NA":return(<p className="afacad-bold text-black rotate-90 bg-[#FDA828] rounded-sm px-1.5 ">{region}</p>)
      case "MHY":return(<p className="afacad-bold text-white rotate-90 bg-[#000000] rounded-sm px-1.5 ">{region}</p>)
      case "THM":return(<p className="afacad-bold text-black rotate-90 bg-[#2feb25] rounded-sm px-1.5 ">{region}</p>)
    }
  }

  return (
    <div className='p-5 flex justify-around h-full w-full items-center'>
      <div className="p-5 w-[25%] h-full flex flex-col items-center justify-center">

        <form onSubmit={handleSubmit(submitHandler)} className='w-full flex relative justify-end items-center'>
          <input
            id="uid"
            placeholder='Enter UID'
            {...register("uid", { required: true, minLength: 9 })}
            className=" bg-gray-800/42 backdrop-blur-md rounded-3xl 
              border border-[#B2B2B2] px-3 py-3 w-full 
              text-[#ebebeb] focus:outline-none focus:ring-2
               focus:ring-amber-400 focus:border-transparent absolute z-0"
          />

          {(resBool1 === 0) ? <>
            <button type="button" className=' rounded-3xl p-2 m-2  text-[1rem] z-10
            ring-[#E3E3E3] bg-gray-600/42  text-white            
            '>
              <GrSearch />
            </button>
          </> : <>
            <button type="submit" className='cursor-pointer text-white rounded-3xl ring-[#E3E3E3] bg-[#B2B2B2]/42 p-2 m-2  text-[1rem] z-10
            hover:bg-white hover:text-black transition'>
              <GrSearch />
            </button>
          </>}

        </form>

        <div className="w-full h-[75%] p-5 mt-5
          bg-gray-800/42 backdrop-blur-md rounded-3xl 
          border border-[#B2B2B2] 
        ">

          {[...localUsers].reverse().map((user, index, arr) => (
            <div key={user.uid} className='h-[12.5%] flex flex-col'>
              <div className='flex mb-1.5 items-center justify-between cursor-pointer' onClick={() => { submitHandler({ uid: user.uid }) }}>

                <div className='flex namesarea max-w-[14rem] w-full overflow-hidden'>
                  <img src={user.profilePictureLink} alt='pfp' className='w-[3.5rem] h-[3.5rem] rounded-[100%] mt-1' />
                  
                  <div className="flex flex-col justify-center ml-3.5 max-w-[10rem] w-full overflow-hidden">
                    <p className="afacad-semi-bold text-white text-[190%] truncate">{user.nickname}</p>

                    <p
                      title={user.signature}
                      className="afacad-semi-bold text-[#ebebeb] text-[80%] mt-[-0.5rem]
                        truncate whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {user.signature}
                    </p>
                  </div>

                </div>

                <div className='regionbox justify-self-end w-[2.5rem] text-center'>
                  {regionRenderer(user.region)}
                </div>
              </div>

              {index !== arr.length - 1 && (
                <div className="border-b-[1px] rounded-2xl border-[#B2B2B2]"></div>
              )}
            </div>
          ))}

        </div>

      </div>
      <div className="flex flex-col">
        {(cardBool === 2)?<>
          <div className="items-center flex flex-col ">
            <p className="afacad-bold text-9xl text-white">
              Welcome to
            </p>
            <p className="afacad-bold text-9xl text-white mt-[-1.5rem]">
              Re<span className='text-amber-400'>:</span>muria
            </p>
          </div>
        </>:<>
          <p className="afacad-bold text-9xl text-white">
            User
          </p>
          <p className="afacad-bold text-9xl text-white mt-[-1.5rem]">
            Search
          </p>
        </>}
        {(cardInfo !== undefined)?<>
          <div onClick={()=>{navigate(`/dashboard/${cardInfo.uid}`)}} className='cursor-pointer'>
            <UserCard props = {cardInfo}/>
          </div>
        </>:<>
          {(cardBool === 0)?<>
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
          </>:<></>}
        </> }
      </div>
    </div>
  )
}

export default Home;
