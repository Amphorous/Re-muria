import React, { useContext, useEffect, useState } from 'react'
import { canvasContextObj } from '../../contexts/CanvasContext'

const Switcher1 = () => {

  const {canvasBool, setCanvasBool} = useContext(canvasContextObj)

  const handleCheckboxChange = () => {
    setCanvasBool((old)=>{
        localStorage.setItem('canvasBool', JSON.stringify(!old))
        return !old;
    })
  }

  return (
    <label className='flex cursor-pointer select-none items-center'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={canvasBool}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <div className={`block h-8 w-14 rounded-full transition-colors ${canvasBool ? 'bg-amber-400' : 'bg-[#acafb4]'}`}></div>
        <div
          className={`dot absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
            canvasBool ? 'translate-x-7' : 'translate-x-1'
          }`}
        ></div>
      </div>
    </label>
  )
}

export default Switcher1
