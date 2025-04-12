import React from 'react'

function Builds() {
  return (
    <div className="flex justify-end items-end w-full h-full ">
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