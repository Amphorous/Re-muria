import React from 'react'
import CurvedScrollList from './components/CurvedScrollList'
import CurvedScrollListTwo from './components/CurvedScrollListTwo';
import CurvedScrollListThree from './components/CurvedScrollListThree';
import CurvedScrollListModular from './components/modularity/CurvedScrollListModular';

function Test() {

 
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
    <div className=" bg-[url('https://wallpapers.com/images/hd/genshin-impact-xiao-3413-x-1920-wallpaper-besnz818ysuofhrd.jpg')]  h-screen">
      {/* <CurvedScrollList 
        items={songs} 
        scrollMidpoint={0.55}
        itemSpacing={95}
      /> */}

      {/* <CurvedScrollListTwo
        items={songs}
        initialFocus={3}
        scrollMidpoint={0.55}   
        itemSpacing={95}  
      /> */}

      {/* <CurvedScrollListThree
        items={songs}
        initialFocus={3}
        scrollMidpoint={0.55}   
        itemSpacing={95}
      /> */}

      {/* <CurvedScrollListModular
        items={songs}
        initialFocus={3}
        scrollMidpoint={0.55}   
        itemSpacing={102}
        dragSensitivity={0.15}
        inertiaDecay={0.95}
        inertiaMultiplier={28}
        springStiffness={250}
        springDamping={25}
      /> */}
      <div className="p-5 thisisthemaincontainer bg-gradient-to-t from-transparent to-black h-screen">
        <div className="bg-amber-200 p-2 m-2">
          hi
        </div>
      </div>
    </div>
  )
}

export default Test