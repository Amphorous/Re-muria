import React, { useEffect, useState } from 'react'
import CurvedScrollListModular from '../modularity/CurvedScrollListModular'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Builds() {



  const params = useParams()
  const uid = params.uid
  const [rankItems, setRankItems] = useState();
  const [resBool, setResBool] = useState(1);

  useEffect(()=>{
    axios.get(`http://localhost:8080/damage/rankings/allBuilds/${uid}`)
    .then((res)=>{
        console.log("this is rankitems: ",res.data)
        if(res.data.length === 0){
          setResBool(0)
        }
        //need to add another endp which gets un built chars
        setRankItems(res.data);
    })
    .catch((err)=>{})
  }, [])

  function newBuilds(){
    axios.get(`http://localhost:8080/user/${uid}`)
    .then((res1)=>{
      axios.get(`http://localhost:8080/damage/rankings/allBuilds/${uid}`)
      .then((res)=>{
          console.log(res.data)
          setRankItems(res.data);
      })
      .catch((err)=>{})
    })
    .catch((err)=>{})
  }

  


  

  return (
    <div>
      {(resBool === 1)?<>
      <div className=" flex justify-end items-end w-full h-full ">
        <CurvedScrollListModular 
            items={rankItems}
            scrollMidpoint={0.45}   
            scrollStart={0}
            itemSpacing={102}
            dragSensitivity={0.15}
            inertiaDecay={0.95}
            inertiaMultiplier={28}
            springStiffness={250}
            springDamping={25}
        />
        <p className="text-white afacad-bold absolute">hi</p>
      </div>
    </>:<>
      <div className="w-full h-full afacad-bold text-9xl text-white flex items-center justify-center absolute backdrop-blur-xs">User builds are probably <br /> private...</div>
    </>}
    </div>
  )
}

export default Builds