import React, { useEffect } from 'react'
import deHashStats from '../../../assets/deHashStats.json'
import axios from 'axios'

function CharacterCard({item}) {

    useEffect(() => {
        localBuildData=sessionStorage.getItem("localBuildData")
        if(localBuildData){
            axios
          .post('http://localhost:8080/build/getBuild', {
            uid: `${item.uid}`,
            avatarId: `${item.avatarId}`,
            buildName: `${buildNameGetter(item.buildName)}`,
          })
          .then((res) => {
            console.log('this is the data', res.data);
          })
          .catch((err) => {
            console.error('Error fetching build:', err);
          });
        }


        
      }, []);
      
    function buildNameGetter(buildName){
        if(buildName === null)
            return null
        return buildName.split('|:AVATAR_ID:|=')[0]
    }

    console.log("This is item ",item)
    console.log("le dehash ", deHashStats[3046])
    function nameCardLink(sideIcon) {
        const parts1 = sideIcon.split('_');
        const name = parts1.at(-1).split('.')[0];
        return `https://enka.network/ui/UI_NameCardPic_${name}_P.png`;
      }

  return (
    <div className='w-full h-full flex border-black border-2 rounded relative' style={{
        backgroundImage: `url(${nameCardLink(item.sideIcon)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div
            className='w-[25%] h-full flex items-center rounded-2xl'>
                <img style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            }} src={item.gachaIcon} className='' />



        </div>
        <div className=' ml-[25%] border-amber-400 border-2 rounded-2xl absolute w-[75%] h-full flex items-center justify-around backdrop-blur-xs'>
            <div className='flex flex-col justify-between w-[55%] h-[100%] items-center'>
                <div className='border-2 border-black rounded-xl w-[50%] backdrop-blur-3xl bg-white/35 mt-5 h-[25%]'>
                    <img src="" alt="" />
                </div>
                <div className='border-2 border-black rounded-md w-[100%]'>stats</div>
            </div >
            <div className='border-black border-2 w-[35%] h-full items-center flex justify-center rounded-md'>artifacts</div>

        </div>
</div>

  )
}

export default CharacterCard