import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Coming() {

  const navigate = useNavigate()

  return (
    <div className='bg-white/42 backdrop-blur-md h-full w-full flex flex-col items-center justify-center '>
      <p className='text-[12rem] afacad-light text-amber-400'>Coming Soon </p>
      <button className='rounded-[100%] p-5 text-5xl bg-amber-400 text-white' onClick={()=>{window.history.back()}}>
        <IoMdArrowRoundBack />
      </button>
    </div>
  )
}

export default Coming