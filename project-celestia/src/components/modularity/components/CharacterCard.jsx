import React, { useEffect, useState } from 'react'
import deHashStats from '../../../assets/deHashStats.json'
import {FastAverageColor} from 'fast-average-color';
import tinycolor from 'tinycolor2';
import axios from 'axios'
import weaponDictionary from '../../../assets/loc.json'

import ATK from '../../../assets/icons/ATK.png';
import HP from '../../../assets/icons/HP.png';
import DEF from '../../../assets/icons/DEF.png';
import HPP from '../../../assets/icons/HPP.png';
import ATKP from '../../../assets/icons/ATKP.png';
import DEFP from '../../../assets/icons/DEFP.png';
import CR from '../../../assets/icons/CR.png';
import CD from '../../../assets/icons/CD.png';
import ER from '../../../assets/icons/ER.png';
import HEAL from '../../../assets/icons/HEAL.png';
import EM from '../../../assets/icons/EM.png';
import PHYS from '../../../assets/icons/PHYS.png';
import PYRO from '../../../assets/icons/PYRO.png';
import ELECTRO from '../../../assets/icons/ELECTRO.png';
import HYDRO from '../../../assets/icons/HYDRO.png';
import ANEMO from '../../../assets/icons/ANEMO.png';
import CRYO from '../../../assets/icons/CRYO.png';
import GEO from '../../../assets/icons/GEO.png';
import DENDRO from '../../../assets/icons/DENDRO.png';
import STAR from '../../../assets/icons/WARERAWA.png'


function CharacterCard({item}) {

  const [shades, setShades] = useState(0);
  const [cardMap, setCardMap] = useState({"0":{"test":"test"}});
  const [currentCardInfo, setCurrentCardInfo] = useState(null);
  const [iconsAsset, setIconsAsset] = useState({"0":{"test":"test"}});
  const [currentIconAsset, setCurrentIconAsset] = useState(null);

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
          ligma: base.clone().lighten(5).toHexString(),
          light: base.clone().darken(20).toHexString(),
          lighter: base.clone().darken(25).toHexString(),
          abitdark: base.clone().darken(30).toHexString(),
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
                console.log("card Map: ", updated)
                return updated
              })
      })
      .catch((err) => {
              console.error('Error fetching build:', err);
      });
    } else {
      setCurrentCardInfo(cardMap[identifier])
    }
    
    
  
  }, [item.buildName, item.avatarId])

  useEffect(() => {
    setCurrentIconAsset(null);
    let identifier = `${item.avatarId}`
    if(iconsAsset[identifier] === undefined){
      axios.get(`http://localhost:8080/asset/avatar/getAsset/${item.avatarId}`)
      .then((res)=>{
        setIconsAsset((prev)=>{
          let updated = {
            ...prev,
            [identifier]: res.data
          }
          console.log("icons Asset: ", updated)
          setCurrentIconAsset(res.data);
          return updated
        })
      })
      .catch((err)=>{})
    } else {
      setCurrentIconAsset(iconsAsset[identifier])
    }
 
  }, [item.avatarId])
  
   
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

    function weaponIconGetter(weapon){
      let text = weapon.icon
      return "https://enka.network/ui/"+text+".png"
    }

    function statToIconGetter(text) {
      switch (text) {
        case "FIGHT_PROP_BASE_ATTACK": return ATK;
        case "FIGHT_PROP_HP": return HP;
        case "FIGHT_PROP_ATTACK": return ATK;
        case "FIGHT_PROP_DEFENSE": return DEF;
        case "FIGHT_PROP_HP_PERCENT": return HPP;
        case "FIGHT_PROP_ATTACK_PERCENT": return ATKP;
        case "FIGHT_PROP_DEFENSE_PERCENT": return DEFP;
        case "FIGHT_PROP_CRITICAL": return CR;
        case "FIGHT_PROP_CRITICAL_HURT": return CD;
        case "FIGHT_PROP_CHARGE_EFFICIENCY": return ER;
        case "FIGHT_PROP_HEAL_ADD": return HEAL;
        case "FIGHT_PROP_ELEMENT_MASTERY": return EM;
        case "FIGHT_PROP_PHYSICAL_ADD_HURT": return PHYS;
        case "FIGHT_PROP_FIRE_ADD_HURT": return PYRO;
        case "FIGHT_PROP_ELEC_ADD_HURT": return ELECTRO;
        case "FIGHT_PROP_WATER_ADD_HURT": return HYDRO;
        case "FIGHT_PROP_WIND_ADD_HURT": return ANEMO;
        case "FIGHT_PROP_ICE_ADD_HURT": return CRYO;
        case "FIGHT_PROP_ROCK_ADD_HURT": return GEO;
        case "FIGHT_PROP_GRASS_ADD_HURT": return DENDRO;
        default: return "icon-default";
      }
    }
    
    function starRenderer(rankLevel){
      
      switch(rankLevel){
        case 5: return (<div className="flex absolute w-[75px] mt-[-4px] items-center justify-center">
             <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
             </div>
             <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
             </div>
             <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
             </div>
             <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
             </div>
             <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
             </div>
        </div>)
        case 4: return (<div className="flex absolute w-[75px] mt-[-4px] items-center justify-center">
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
              </div>
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" /> 
              </div>
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
              </div>
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
              </div>
        </div>)
        case 3: return (<div className="flex absolute w-[75px] mt-[-4px] items-center justify-center">
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
              </div>
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" /> 
              </div>
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
              </div>
        </div>)
        case 2: return (<div className="flex absolute w-[75px] mt-[-4px] items-center justify-center">
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
              </div>
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" /> 
              </div>
        </div>)
        case 1: return (<div className="flex absolute w-[75px] mt-[-4px] items-center justify-center">
              <div className='w-[15px] h-[15px]'>
                <img src={STAR} alt="" />
              </div>
        </div>)
      }
      
    }

    function refineGetter(obj) {
      return ((Object.values(obj)[0])+1);
    }
    

  return (
    <div className='w-full h-full flex rounded-3xl relative overflow-hidden ring-[2px] ring-[#B2B2B2]/20' style={{
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
                <div className="flex flex-col  w-full p-2 m-9 rounded-3xl">
                  <div className="flex w-full nameAndCons">
                    <div className="flex flex-col  ">
                      <div className="flex ">
                        <p className=" afacad-light text-white/50 text-xl">{currentCardInfo.nickname}'s</p>
                      </div>
                      <div className="flex">
                        <p className=" afacad-bold text-white text-5xl">
                          {(item.buildName === null)?<>{nameGetter(item.category)}</>:<>{textTrunc(buildNameGetter(item.buildName), 12)}</>}
                        </p>
                      </div>
                      <div className="flex ">
                        <p className=" afacad-light text-white/50 text-xl">Lv. {currentCardInfo.level}/90</p>
                      </div>
                    </div>

                    {currentIconAsset && 
                      <div className="flex constellations items-center ml-[2%] min-w-[408px]">
                        {
                          currentIconAsset.consts.map((constString, index)=>(
                            <div key={index} className='flex'>
                              <img src={`https://enka.network/ui/${constString}.png`} alt={`con ${index+1}`} 
                              className='bg-black/42 rounded-full p-1 m-1 w-[60px] h-[60px]'/>
                              {
                                ((currentCardInfo.constLevel > index)?<>
                                  <div className="absolute rounded-full p-1 m-1 w-[60px] h-[60px] inthisdivrighthere"
                                    style={{ boxShadow: `0 0 0 2px ${shades.ligma}` }}
                                  ></div>
                                </>:<>
                                  <div className="absolute bg-black/42 rounded-full p-1 m-1 w-[60px] h-[60px] ring-2 ring-[#B2B2B2]/42"></div>
                                </>)
                              }
                            </div>
                          ))
                        }
                      </div>
                      }

                  </div>

                  <div className="flex h-full wepAndStats">
                        <div className="flex flex-col">
                          <div className="p-2 mt-5 rounded-3xl weaponBox flex "
                           style={{backgroundColor: shades.light, boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.5)'}}>
                            <div className='p-2 flex items-center mb-3'>
                              <div>
                                <img src={weaponIconGetter(currentCardInfo.weapon)} className='w-[75px] h-[75px]' />
                                {
                                  starRenderer(currentCardInfo.weapon.rankLevel)
                                }
                              </div>
                            </div>
                            <div className="flex flex-col p-2">
                              <p className="afacad-semi-bold text-2xl max-w-[10rem] text-left">{weaponDictionary["en"][`${currentCardInfo.weaponId}`]}</p>
                              <div className="flex ">
                                <div className=" rounded-3xl text-white px-2 afacad-light flex items-center" style={{backgroundColor: shades.abitdark}}>
                                  <img src={statToIconGetter(currentCardInfo.weapon.weaponStats[0].appendPropId)} alt="" className='w-[20px] h-[20px]'/>
                                  <p>{currentCardInfo.weapon.weaponStats[0].statValue}</p>
                                </div>
                                <div className=" rounded-3xl text-white px-2 afacad-light flex items-center ml-1" style={{backgroundColor: shades.abitdark}}>
                                  <img src={statToIconGetter(currentCardInfo.weapon.weaponStats[1].appendPropId)} alt="" className='w-[20px] h-[20px]'/>
                                  <p>{currentCardInfo.weapon.weaponStats[1].statValue} 
                                  {(currentCardInfo.weapon.weaponStats[1].appendPropId !== "FIGHT_PROP_ELEMENT_MASTERY") && (`%`)} </p>
                                </div>
                              </div>
                              <div className="flex mt-1">
                                <div className=" rounded-3xl text-white px-2 afacad-light flex items-center" style={{backgroundColor: shades.dark}}>
                                  <p>R{refineGetter(currentCardInfo.weaponInfo.affixMap)}</p>
                                </div>
                                <div className=" rounded-3xl text-white px-2 afacad-light flex items-center ml-1" style={{backgroundColor: shades.dark}}>
                                  <p>Lv. {currentCardInfo.weaponInfo.level}/90</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="statsBox"></div>
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