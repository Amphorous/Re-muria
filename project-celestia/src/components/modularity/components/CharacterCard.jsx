import React, { useEffect, useState } from 'react'
import deHashStats from '../../../assets/deHashStats.json'
import {FastAverageColor} from 'fast-average-color';
import tinycolor from 'tinycolor2';
import axios from 'axios'

function CharacterCard({item}) {

  const [shades, setShades] = useState(0);
  const [cardMap, setCardMap] = useState({"0":{"test":"test"}});
  const [currentCardInfo, setCurrentCardInfo] = useState(null)

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // very important for CORS
    img.src = item.gachaIcon;
  
    img.onload = async () => {
      try {
        const fac = new FastAverageColor();
        const color = await fac.getColorAsync(img, { mode: 'speed' });
        const base = tinycolor(color.hex);
  
        setShades({
          light: base.clone().darken(20).toHexString(),
          lighter: base.clone().darken(25).toHexString(),
          darker: base.clone().darken(35).toHexString(),
          dark: base.clone().darken(45).toHexString()
        });
      } catch (e) {
        console.error('Color extraction error:', e);
      }
    };
  
    img.onerror = (e) => {
      console.error('Image failed to load:', e);
    };
  }, [item.gachaIcon]);

  function avatarIdOrBuildName(avatarId, buildName){
    return (buildName === null)?(`${avatarId}`):(buildName);
  }

  useEffect(() => {
    setCurrentCardInfo(null)
    console.log(avatarIdOrBuildName(item.avatarId, item.buildName));
    // console.log(cardMap[`${avatarIdOrBuildName(item.avatarId, item.buildName)}`])
    let identifier = avatarIdOrBuildName(item.avatarId, item.buildName);
    if(cardMap[identifier] === undefined){
      axios.post('http://localhost:8080/build/getBuild', {
            uid: `${item.uid}`,
            avatarId: `${item.avatarId}`,
            buildName: buildNameGetter(item.buildName),
      })
      .then((res) => {
              setCurrentCardInfo(res.data)
              setCardMap((prev)=>{
                let updated = {
                  ...prev,
                  [identifier]: res.data
                }
                console.log(updated)
                return updated
              })
              //console.log('this is the data', res.data);
      })
      .catch((err) => {
              console.error('Error fetching build:', err);
      });
    } else {
      setCurrentCardInfo(cardMap[identifier])
    }
    console.log("build changed on display::::::::::::::::::::::::::::")
    
    
  
  }, [item.buildName, item.avatarId])
   
    function buildNameGetter(buildName){
        if(buildName === null)
            return null
        return buildName.split('|:AVATAR_ID:|=')[0]
    }

    function textTrunc(text, max){
      return text.length > max ? text.slice(0, max) : text;
    }

    function nameGetter(text){
      let firstPart = text.split(':')[0].toLowerCase()
      return firstPart.charAt(0).toUpperCase()+firstPart.slice(1)
    }

    //console.log("This is item ",item)
    //console.log("le dehash ", deHashStats[3046])

  return (
    <div className='w-full h-full flex rounded-3xl relative overflow-hidden ring-[2px] ring-[#B2B2B2]/20 here' style={{
      //i want the fade to go from left to right shades.lighter to shades.darker
      background: `linear-gradient(to right, ${shades.light}, ${shades.lighter}, ${shades.darker}, ${shades.dark})`
    }}>
        <div
            className='w-full h-full flex items-center  ml-[-40%] rounded-3xl '>
                <img style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            }} src={item.gachaIcon} className='' />
        </div>
        <div className="absolute flex justify-end rounded-3xl  w-full h-full ">
            <div className=' rounded-3xl w-[80%] backdrop-blur-xl border-l-[0.5px] border-[#B2B2B2]/39 rounded-l-4xl flex'>
              {
                (currentCardInfo === null)?<>
                  <div className="w-full h-full flex justify-center items-center">
                    <p className="afacad-bold text-white text-7xl">Loading...</p>
                  </div>
                </>:
                <div className="flex flex-col p-2 m-9 rounded-3xl">
                  <div className="flex flex-col">
                    <div className="flex ">
                      <p className=" afacad-light text-white/50 text-xl">{currentCardInfo.nickname}'s</p>
                    </div>
                    <div className="flex">
                      <p className=" afacad-bold text-white text-5xl">{(item.buildName === null)?<>{nameGetter(item.category)}</>:<>{textTrunc(buildNameGetter(item.buildName), 12)}</>}</p>
                    </div>
                    <div className="flex ">
                      <p className=" afacad-light text-white/50 text-xl">Lv. 90/90</p>
                    </div>
                  </div>
                </div>
              }
            </div>
        </div>
  </div>

  )
}

export default CharacterCard