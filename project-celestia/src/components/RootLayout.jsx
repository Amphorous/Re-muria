import React from 'react'
import bgig from '../assets/baguette.jpg'
import CurvedScrollListModular from './modularity/CurvedScrollListModular';
import { Outlet } from 'react-router-dom';
import Header from './common/Header';

function RootLayout() {
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
    <div className="bg-black h-screen relative overflow-hidden">
        <div className="z-20 w-screen h-[10%]">
          <Header/>
        </div>
        <div className="absolute bg-gradient-to-b from-black to-transparent h-[5rem] w-full z-10"></div>
        
        

        <div className='-z-10'>
          <div className="absolute z-0  mt-[3.5rem] ml-[-15rem] w-[60rem] h-[60rem]" style={{
              backgroundImage: `url('${bgig}')`,
              backgroundRepeat: 'no-repeat'
            }}>
          </div>
          <div className="absolute mt-[8rem] bg-gradient-to-l from-black to-transparent h-full w-[32rem] ml-[13rem]"></div>
          <div className="absolute mt-0 w-[100%] bg-black h-[8rem]"></div>
          <div className="absolute mt-[8rem] bg-gradient-to-b from-black to-transparent h-[24rem] w-full"></div>
        </div>
        
        <div className="fixed w-full h-[90%] z-0">

          <Outlet />

        </div>
    </div>

  )
}

export default RootLayout
