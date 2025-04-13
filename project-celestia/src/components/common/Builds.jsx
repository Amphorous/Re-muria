import React, { useEffect, useState } from 'react'
import CurvedScrollListModular from '../modularity/CurvedScrollListModular'
import axios from 'axios';

function Builds({uid}) {

  const [rankItems, setRankItems] = useState();
  const [resBool, setResBool] = useState(1);

  useEffect(()=>{
    axios.get(`http://localhost:8080/damage/rankings/${uid}`)
    .then((res)=>{
        console.log(res.data)
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

  const songs = [
    { title: 'Song A', artist: 'Artist Alpha' },
    { title: 'Song B', artist: 'Artist Beta' },
    { title: 'Song C', artist: 'Artist Gamma' },
    { title: 'Song D', artist: 'Artist Delta' },
    { title: 'Song E', artist: 'Artist Epsilon' },
    { title: 'Song F', artist: 'Artist Zeta' },
    { title: 'Song G', artist: 'Artist Eta' },
    { title: 'Song H', artist: 'Artist Theta' },
    { title: 'Song I', artist: 'Artist Iota' },
    { title: 'Song J', artist: 'Artist Kappa' },
    { title: 'Song K', artist: 'Artist Lambda' },
    { title: 'Song L', artist: 'Artist Mu' },
    { title: 'Song M', artist: 'Artist Nu' },
    { title: 'Song N', artist: 'Artist Xi' },
    { title: 'Song O', artist: 'Artist Omicron' },
    { title: 'Song P', artist: 'Artist Pi' },
    { title: 'Song Q', artist: 'Artist Rho' },
    { title: 'Song R', artist: 'Artist Sigma' },
    { title: 'Song S', artist: 'Artist Tau' },
    { title: 'Song T', artist: 'Artist Upsilon' },
    { title: 'Song U', artist: 'Artist Phi' },
    { title: 'Song V', artist: 'Artist Chi' },
  ];

  return (
    <div className=" flex justify-end items-end w-full h-full ">
        <CurvedScrollListModular 
            items={songs}
            initialFocus={10}
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