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
    axios.get(`http://localhost:8080/damage/rankings/${uid}`)
    .then((res)=>{
        console.log("this is rankitems: ",res.data)
        setRankItems(res.data);
    })
    .catch((err)=>{})
  }, [])

  function newBuilds(){
    axios.get(`http://localhost:8080/user/${uid}`)
    .then((res1)=>{
      axios.get(`http://localhost:8080/damage/rankings/${uid}`)
      .then((res)=>{
          console.log(res.data)
          setRankItems(res.data);
      })
      .catch((err)=>{})
    })
    .catch((err)=>{})
  }

  


  

  return (
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
  )
}

export default Builds