import React from 'react'
import bgig from '../assets/baguette.jpg'
import CurvedScrollListModular from './modularity/CurvedScrollListModular';
import { Outlet } from 'react-router-dom';
import Header from './common/Header';

function RootLayout() {
  
  return (
    <div className="bg-black h-screen relative overflow-hidden">
        <div className="z-20 w-screen h-[10%]">
          <Header/>
        </div>
        <div className="absolute bg-gradient-to-b from-black to-transparent h-[5rem] w-full z-10"></div>
        
        

        <div className='-z-10'>
          <div className="absolute z-0  mt-[1rem] ml-[-16.8rem] w-[60rem] h-[60rem]" style={{
              backgroundImage: `url('${bgig}')`,
              backgroundRepeat: 'no-repeat'
            }}>
          </div>
          <div className="absolute mt-[8rem] bg-gradient-to-l from-black to-transparent h-full w-[31.1rem] ml-[12.1rem]"></div>
          <div className="absolute mt-0 w-[100%] bg-black h-[8rem]"></div>
          <div className="absolute mt-[8rem] bg-gradient-to-b from-black via-transparent to-transparent h-[24rem] w-full"></div>
        </div>
        
        <div className="fixed w-full h-[90%] z-0">

          <Outlet />

        </div>
    </div>

  )
}

export default RootLayout
