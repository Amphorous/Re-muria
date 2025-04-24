import React, { useEffect, useState } from 'react';
import ach from '../../assets/achievementIcon.webp';
import aby from '../../assets/abyssStar.png';
import imag from '../../assets/imaginariumStar.png';
import fetter from '../../assets/fetterIcon.png';
import axios from 'axios';

  function textTrunc(text, max){
    if(text != null){
        return text.length > max ? text.slice(0, max) + '...' : text;
    }
    return "No signature."
  }

  function regionRenderer(region){
    switch(region){
      case "ASIA":return(<p className="afacad-bold text-black  bg-[#FDF628] rounded-sm px-1.5 w-[2.5rem] text-center">{region}</p>)
      case "EU":return(<p className="afacad-bold text-black  bg-[#285AFD] rounded-sm px-1.5 w-[2.5rem] text-center">{region}</p>)
      case "CN":return(<p className="afacad-bold text-black  bg-[#FD4428] rounded-sm px-1.5 w-[2.5rem] text-center">{region}</p>)
      case "NA":return(<p className="afacad-bold text-black  bg-[#FDA828] rounded-sm px-1.5 w-[2.5rem] text-center">{region}</p>)
      case "MHY":return(<p className="afacad-bold text-white  bg-[#000000] rounded-sm px-1.5 w-[2.5rem] text-center">{region}</p>)
      case "THM":return(<p className="afacad-bold text-black  bg-[#2feb25] rounded-sm px-1.5 w-[2.5rem] text-center">{region}</p>)
    }
  }

function UserCard(props) {
    const cardInfo = props.props;

    const [lastUpdated, setLastUpdated] = useState(0);

  useEffect(() => {
    if (!cardInfo.uid) return;
    axios.get(`http://localhost:8080/timeout/getTimeout/${cardInfo.uid}`)
      .then((res) => {
        setLastUpdated(((res.data)+60)); // Assuming res.data is a string like "5 mins ago"
      })
      .catch((err) => {
        console.error("Error fetching timeout:", err);
        setLastUpdated("Unavailable");
      });
  }, [cardInfo.uid]);

  useEffect(() => {
    const interval = setInterval(() => {
        setLastUpdated((prev)=>{
            return (prev+1);
        })
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  function copyText(uid){
    navigator.clipboard.writeText(uid)
    .then()
    .catch((err)=>{})
  }

  return (
    //w:h is 21:10 please make sure
    <div className=' text-black  w-[31.5rem] h-[15rem] '>

        <div className="z-0 bg-cover bg-center h-full w-full rounded-md" style={{backgroundImage: `url(${cardInfo.nameCardLink})`}}>
            <div className=" bg-gray-800/42 backdrop-blur-xs w-[31.5rem] h-[17rem] rounded-md absolute flex justify-end">
                <div className="absolute text-white mr-[28.5rem] -rotate-90 mt-10 flex libre-baskerville-regular backdrop-blur-xs rounded-4xl">
                    <p>AR:</p>
                    <p>{cardInfo.level}</p>
                </div>
                <div className=" h-full w-[30rem] rounded-lg border-2 border-dashed  border-white/42">
                    <div className="flex flex-col h-full">
                        <div className="flex p-5">
                            <img src={cardInfo.profilePictureLink} className='rounded-[100%] w-[100px] h-[100px] bg-gray-500/35 backdrop-blur-xs' />
                            <div className="flex flex-col justify-center mt-2.5 ml-4">
                                <p className="text-6xl libre-baskerville-bold text-white truncate overflow-ellipsis  max-w-[21rem]">
                                    {cardInfo.nickname}
                                </p>
                                <p className="text-md libre-baskerville-regular text-[#e4e4e4] ">
                                    {textTrunc(cardInfo.signature, 30)}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center w-full h-full">
                            <div className="flex flex-col w-full justify-start h-full">

                                <div className="flex justify-start mb-3 ml-[2.5rem]">
                                    <div className="mr-4">
                                        {regionRenderer(cardInfo.region)}
                                    </div>
                                    <div className="bg-[#93590D] afacad-bold text-white px-2 text-center rounded-sm flex justify-center items-center mr-4">
                                        <img src={ach} className='w-[24px] h-[24px]' />
                                        {cardInfo.finishAchievementNum}
                                    </div>
                                    <div className="bg-[#93590D] afacad-bold text-white px-1.5 text-center rounded-sm flex justify-center items-center mr-4">
                                        <img src={imag} className='w-[24px] h-[24px]' />
                                        • {cardInfo.theaterStarIndex || 0}
                                    </div>
                                    <div className="bg-[#93590D] afacad-bold text-white px-1.5 text-center rounded-sm flex justify-center items-center mr-4">
                                        <img src={aby} className='w-[24px] h-[24px]' />
                                        {cardInfo.towerFloorIndex}-{cardInfo.towerLevelIndex} • {cardInfo.towerStarIndex}
                                    </div>
                                </div>

                                <div className="flex justify-start ml-[2.5rem]">
                                    <div className="bg-[#93590D] afacad-bold text-white px-1.5 text-center rounded-sm flex justify-center items-center mr-4">
                                        <img src={fetter} className='w-[24px] h-[24px]' />
                                        {cardInfo.fetterCount}
                                    </div>
                                    <div onClick={()=>{copyText(cardInfo.uid)}} className="bg-[#93590D] afacad-bold text-white px-1.5 text-center rounded-sm flex justify-center items-center cursor-copy">
                                        UID • {cardInfo.uid}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col justify-end text-white/42 ml-[1rem] afacad-bold mb-0.5">
                            Last Updated: {(lastUpdated>=60)?<>
                                {(lastUpdated>=3600)?<>
                                    {Math.floor(lastUpdated/3600)} hrs
                                </>:<>
                                    {Math.floor(lastUpdated/60)} min
                                </>}
                            </>:<>{lastUpdated} seconds</>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard