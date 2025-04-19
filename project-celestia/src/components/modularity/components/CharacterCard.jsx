import React, { useEffect, useState } from 'react'
import deHashStats from '../../../assets/deHashStats.json'
import {FastAverageColor} from 'fast-average-color';
import tinycolor from 'tinycolor2';
import axios from 'axios'
import weaponDictionary from '../../../assets/loc.json'
import locJSON from '../../../assets/loc.json'
import loading from '../../../assets/loading.gif'

import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

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
import STAR from '../../../assets/icons/WARERAWA.png';

import FE from '../../../assets/icons/FE.webp';
import FL from '../../../assets/icons/FL.webp';
import SA from '../../../assets/icons/SA.webp';
import GO from '../../../assets/icons/GO.webp';
import CI from '../../../assets/icons/CI.webp';


function CharacterCard({item}) {

  const [shades, setShades] = useState({
    GRAY:      "#B2B2B2",
    ligma:     "#E0E0E0",  
    light:     "#CCCCCC",
    lighter:   "#B2B2B2",
    abitdark:  "#999999",
    darker:    "#7F7F7F",
    dark:      "#666666"   
  });
  const [gachaImageLoaded, setGachaImageLoaded] = useState(false);
  const [cardMap, setCardMap] = useState({"0":{"test":"test"}});
  const [currentCardInfo, setCurrentCardInfo] = useState(null);
  const [iconsAsset, setIconsAsset] = useState({"0":{"test":"test"}});
  const [currentIconAsset, setCurrentIconAsset] = useState(null);

  useEffect(()=>{
    console.log(item.category)
  }, [item.buildName, item.avatarId])

  useEffect(() => {
    setGachaImageLoaded(false);
    const img = new Image();
    img.crossOrigin = 'anonymous'; // very important for CORS
    img.src = item.gachaIcon;
  
    img.onload = async () => {
      try {
        setGachaImageLoaded(true);
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
  
    function avatarIdOrBuildName(avatarId, buildName){
      return (buildName === null)?(`${avatarId}`):(buildName);
    }
   
    function buildNameGetter(buildName){
        if(buildName === null)
            return null
        return buildName.split('|:AVATAR_ID:|=')[0]
    }

    function textTrunc(text, max){
      return text.length > max ? text.slice(0, max) : text;
    }

    function nameGetter(nameHash){

      return locJSON["en"][nameHash]
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

    function statGetter(base = 0, flat = 0, percent = 0){
      return (base + (base*percent) + flat).toFixed()
    }

    function artifactIconGetter(name){
      return "http://enka.network/ui/"+name+".png";
    }

    function artifactFlowerImageGetter(setNameKey, artifactArray){
      let intermediatePart = ""
      for(let i = 0; i < artifactArray.length; i++){
        if(setNameKey === artifactArray[i].flat.setNameTextMapHash){
          intermediatePart = artifactArray[i].flat.icon.split("_")[2]
          return "https://enka.network/ui/UI_RelicIcon_"+intermediatePart+"_4.png";
        }
      }
    }

    const propIcons = {
      FIGHT_PROP_ATTACK: ATK,
      FIGHT_PROP_HP: HP,
      FIGHT_PROP_DEFENSE: DEF,
      FIGHT_PROP_HP_PERCENT: HPP,
      FIGHT_PROP_ATTACK_PERCENT: ATKP,
      FIGHT_PROP_DEFENSE_PERCENT: DEFP,
      FIGHT_PROP_CRITICAL: CR,
      FIGHT_PROP_CRITICAL_HURT: CD,
      FIGHT_PROP_CHARGE_EFFICIENCY: ER,
      FIGHT_PROP_HEAL_ADD: HEAL,
      FIGHT_PROP_ELEMENT_MASTERY: EM,
      FIGHT_PROP_PHYSICAL_ADD_HURT: PHYS,
      FIGHT_PROP_FIRE_ADD_HURT: PYRO,
      FIGHT_PROP_ELEC_ADD_HURT: ELECTRO,
      FIGHT_PROP_WATER_ADD_HURT: HYDRO,
      FIGHT_PROP_WIND_ADD_HURT: ANEMO,
      FIGHT_PROP_ICE_ADD_HURT: CRYO,
      FIGHT_PROP_ROCK_ADD_HURT: GEO,
      FIGHT_PROP_GRASS_ADD_HURT: DENDRO
    };

    const emptyArts = {
      0: FL,
      1: FE,
      2: SA,
      3: GO,
      4: CI
    }

    function getPercentSymbol(text){
      let parts = text.split('_')
      let lastItem = parts[parts.length - 1]
      switch(lastItem){
        case "HURT": 
        case "EFFICIENCY":
        case "CRITICAL": 
        case "PERCENT": 
        case "ADD": return "%"
        default: return ""
      }
    }

    function showArtifacts(artifactList, n) {
      const equipType = switchType(n);
      if (!equipType) {
        console.log("Invalid equip type index.");
        return null;
      }
    
      for (const artifact of artifactList) {
        if (artifact.flat && artifact.flat.equipType === equipType) {
          return (
          <div className={`flex mb-2.5 p-1 rounded-3xl overflow-hidden max-h-[18%] h-[18%] justify-start relative w-[100%]  `}
          style={{backgroundColor: shades.light, boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.5)', borderColor: shades.ligma}}>
          
            <div className=" w-full h-full absolute flex">
              <img src={artifactIconGetter(artifact.flat.icon)} className=' scale-125 ml-[-3%]'
               />
               <div className=" absolute bg-black/62 rounded-3xl px-1 pr-[1.75%] text-xs flex items-center justify-center  top-1 left-[14%] afacad-light">
                +{artifact.reliquary.level - 1}
               </div>
            </div>
            <div className={`absolute flex h-full w-full justify-end `}>
              <div className=" p-5 w-[25%] flex flex-col items-center justify-center -mt-1"
              style={{backgroundImage: `linear-gradient(to left, ${shades.darker}80,${shades.light}1A)`}}
              >
                <img src={propIcons[artifact.flat.reliquaryMainstat.mainPropId]} className=' scale-[60%] -mb-2 ml-1 scale-75  mt-' />
                <p className='afacad-light -mt-1 ml-1'>{artifact.flat.reliquaryMainstat.statValue}{getPercentSymbol(artifact.flat.reliquaryMainstat.mainPropId)}</p>
              </div>
              <div className={` p-2 w-[60%] w-mac -mt-1  flex flex-col justify-evenly items-center afacad-light text-lg pl-3 `}
                style={{ boxShadow: `0 0 0 2px ${shades.ligma}B3 `}}
              >
                
                <div className="flex justify-evenly h-full w-full "> 
                  
                    {(artifact.flat.reliquarySubstats[0] !== null) &&
                      <div className=" flex items-center  w-full">
                        
                        <img src={propIcons[artifact.flat.reliquarySubstats[0].appendPropId]}
                          className='w-[25px] h-[25px]'
                        />
                        <p className='ml-1'>+{artifact.flat.reliquarySubstats[0].statValue.toFixed(1)}{getPercentSymbol(artifact.flat.reliquarySubstats[0].appendPropId)}</p>
                      </div>
                     }

                     {(artifact.flat.reliquarySubstats[1] !== null) &&
                      <div className=" flex items-center  w-full">
                        
                        <img src={propIcons[artifact.flat.reliquarySubstats[1].appendPropId]}
                          className='w-[25px] h-[25px]'
                        />
                        <p className='ml-1'>+{artifact.flat.reliquarySubstats[1].statValue.toFixed(1)}{getPercentSymbol(artifact.flat.reliquarySubstats[1].appendPropId)}</p>
                      </div>
                     }
                </div>
                <div className="flex justify-evenly h-full w-full">
                    {(artifact.flat.reliquarySubstats[2] !== null) &&
                      <div className=" flex items-center  w-full">
                        
                        <img src={propIcons[artifact.flat.reliquarySubstats[2].appendPropId]}
                          className='w-[25px] h-[25px]'
                        />
                        <p className='ml-1'>+{artifact.flat.reliquarySubstats[2].statValue.toFixed(1)}{getPercentSymbol(artifact.flat.reliquarySubstats[2].appendPropId)}</p>
                      </div>
                     }
                     {(artifact.flat.reliquarySubstats[3] !== null) &&
                      <div className=" flex items-center  w-full">
                        
                        <img src={propIcons[artifact.flat.reliquarySubstats[3].appendPropId]}
                          className='w-[25px] h-[25px]'
                        />
                        <p className='ml-1'>+{artifact.flat.reliquarySubstats[3].statValue.toFixed(1)}{getPercentSymbol(artifact.flat.reliquarySubstats[3].appendPropId)}</p>
                      </div>
                     }
                </div>
                
              </div>
            </div>
          
          </div>
          )
        }
      }
      return (
        <div className='flex mb-2.5 p-1 rounded-3xl overflow-hidden max-h-[18%] h-[18%] justify-center items-center  w-full'
        style={{backgroundColor: `${shades.ligma}33`, boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.5)'}}>
        
          <div className=" w-full h-full  flex justify-center items-center">
            <img src={emptyArts[n]} className=' scale-100 '
             />
          </div>
          
        
        </div>
        )

    }

    function switchType(num){
      switch(num){
        case 0: return "EQUIP_BRACER"
        case 1: return "EQUIP_NECKLACE"
        case 2: return "EQUIP_SHOES"
        case 3: return "EQUIP_RING"
        case 4: return "EQUIP_DRESS"
        default: return null
      }
    }
 
  return (

    // <Tilt perspective={1000000} tiltReverse={true} className=''>
      <div id='capture-this' className='w-full h-full flex rounded-3xl relative overflow-hidden ring-[2px] ring-[#B2B2B2]/20 ' style={{
      //i want the fade to go from left to right shades.lighter to shades.darker
      background: `linear-gradient(to right, ${shades.light}, ${shades.lighter}, ${shades.darker}, ${shades.dark})`
    }}>
        <div className='gachaImageDiv w-full h-full flex items-center  ml-[-40%] rounded-3xl '>
            {(gachaImageLoaded)?<></>:<>
                <div className="w-full h-full flex justify-center items-center z-10 absolute ">
                    <img src={loading} alt="" className='w-[192px] h-[108px]'/>
                </div>
            </>}
            
            <img
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                }}
                src={item.gachaIcon}
                className='thisisthegachaicondiv'
                onLoad={() => setGachaImageLoaded(true)}
                onError={(e) => {
                    console.error("Failed to load gachaIcon:", e);
                    setGachaImageLoaded(true); 
                }}
            />
        </div>
        <div className="absolute flex justify-end rounded-3xl  w-full h-full ">
            <div className=' rounded-3xl w-[80%] backdrop-blur-xl border-l-[0.5px] border-[#B2B2B2]/39 rounded-l-4xl flex '>
              {
                (currentCardInfo === null)?<>
                  <div className="w-full h-full flex justify-center items-center">
                    <p className="afacad-bold text-white text-7xl">Loading...</p>
                  </div>
                </>:
                <div className="flex flex-col  w-full p-2 m-9 ">
                  <div className="flex w-full nameAndCons">
                    <div className="flex flex-col  ">
                      <div className="flex ">
                        <p className=" afacad-light text-white/50 text-xl">{currentCardInfo.nickname}'s</p>
                      </div>
                      <div className="flex">
                        <p className=" afacad-bold text-white text-5xl">
                          {(item.buildName === null)?<>{nameGetter(item.nameTextMapHash)}</>:<>{textTrunc(buildNameGetter(item.buildName), 12)}</>}
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
                                  <div className="absolute rounded-full p-1 m-1 w-[60px] h-[60px] "
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

                  <div className="flex wepAndStats  h-full ">
                        <div className="flex flex-col wepstatscontainer min-w-[17rem] ">
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
                              <p className="afacad-semi-bold text-2xl max-w-[10rem] text-left leading-5 mb-3">{weaponDictionary["en"][`${currentCardInfo.weaponId}`]}</p>
                              <div className="flex ">
                                <div className=" rounded-3xl text-white px-2 afacad-light flex items-center" style={{backgroundColor: shades.abitdark}}>
                                  <img src={statToIconGetter(currentCardInfo.weapon.weaponStats[0].appendPropId)} alt="" className='w-[20px] h-[20px]'/>
                                  <p>{currentCardInfo.weapon.weaponStats[0].statValue}</p>
                                </div>
                                {(currentCardInfo.weapon.weaponStats[1] !== undefined) && <div className=" rounded-3xl text-white px-2 afacad-light flex items-center ml-1" style={{backgroundColor: shades.abitdark}}>
                                  <img src={statToIconGetter(currentCardInfo.weapon.weaponStats[1].appendPropId)} alt="" className='w-[20px] h-[20px]'/>
                                  <p>{currentCardInfo.weapon.weaponStats[1].statValue} 
                                  {(currentCardInfo.weapon.weaponStats[1].appendPropId !== "FIGHT_PROP_ELEMENT_MASTERY") && (`%`)} </p>
                                </div>}
                              </div>
                              <div className="flex mt-1">
                                {(currentCardInfo.weaponInfo.affixMap !== null) && <div className=" rounded-3xl text-white px-2 afacad-light flex items-center" style={{backgroundColor: shades.dark}}>
                                  <p>R{refineGetter(currentCardInfo.weaponInfo.affixMap)}</p>
                                </div>}
                                <div className=" rounded-3xl text-white px-2 afacad-light flex items-center ml-1" style={{backgroundColor: shades.dark}}>
                                  <p>Lv. {currentCardInfo.weaponInfo.level}/90</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <SimpleBar className="p-5 mt-5 rounded-3xl statsBox flex flex-col h-mac max-h-full   " 
                          style={{backgroundColor: shades.light, boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.5)'}}>

                              <div className="flex justify-between HP mb-0.5">
                                <div className="flex items-center">
                                  <img src={HP} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> HP</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {statGetter(currentCardInfo.preBattleStats[1], currentCardInfo.preBattleStats[2], currentCardInfo.preBattleStats[3])}
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-between ATK mb-0.5">
                                <div className="flex items-center">
                                  <img src={ATK} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> ATK</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {statGetter(currentCardInfo.preBattleStats[4], currentCardInfo.preBattleStats[5], currentCardInfo.preBattleStats[6])}
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-between DEF mb-0.5">
                                <div className="flex items-center">
                                  <img src={DEF} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> DEF</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {statGetter(currentCardInfo.preBattleStats[7], currentCardInfo.preBattleStats[8], currentCardInfo.preBattleStats[9])}
                                  </p>
                                </div>
                              </div>

                              {(currentCardInfo.preBattleStats[28] !== 0) && 
                              <div className="flex justify-between EM mb-0.5">
                                <div className="flex items-center">
                                  <img src={EM} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Elemental Mastery</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {currentCardInfo.preBattleStats[28].toFixed()}
                                  </p>
                                </div>
                              </div>}

                              <div className="flex justify-between ER mb-0.5">
                                <div className="flex items-center">
                                  <img src={ER} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Energy Recharge</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[23]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-between CR mb-0.5">
                                <div className="flex items-center">
                                  <img src={CR} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Crit Rate</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[20]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-between CD mb-0.5">
                                <div className="flex items-center">
                                  <img src={CD} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Crit Damage</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[22]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>

                              {(currentCardInfo.preBattleStats[26]*100 > 13) && 
                              <div className="flex justify-between HEAL mb-0.5">
                                <div className="flex items-center">
                                  <img src={HEAL} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Healing Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[26]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}
                              
                              {(currentCardInfo.preBattleStats[30]*100 > 13) && 
                              <div className="flex justify-between PHYS mb-0.5">
                                <div className="flex items-center">
                                  <img src={PHYS} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Physical DMG Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[30]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}

                              {(currentCardInfo.preBattleStats[40]*100 > 13) && 
                              <div className="flex justify-between PYRO mb-0.5">
                                <div className="flex items-center">
                                  <img src={PYRO} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Pyro DMG Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[40]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}

                              {(currentCardInfo.preBattleStats[41]*100 > 13) && 
                              <div className="flex justify-between ELECTRO mb-0.5">
                                <div className="flex items-center">
                                  <img src={ELECTRO} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Electro DMG Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[41]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}

                              {(currentCardInfo.preBattleStats[42]*100 > 13) && 
                              <div className="flex justify-between HYDRO mb-0.5">
                                <div className="flex items-center">
                                  <img src={HYDRO} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Hydro DMG Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[42]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}

                              {(currentCardInfo.preBattleStats[43]*100 > 13) && 
                              <div className="flex justify-between DENDRO mb-0.5">
                                <div className="flex items-center">
                                  <img src={DENDRO} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Dendro DMG Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[43]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}

                              {(currentCardInfo.preBattleStats[44]*100 > 13) && 
                              <div className="flex justify-between ANEMO mb-0.5">
                                <div className="flex items-center">
                                  <img src={ANEMO} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Anemo DMG Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[44]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}

                              {(currentCardInfo.preBattleStats[45]*100 > 13) && 
                              <div className="flex justify-between GEO mb-0.5">
                                <div className="flex items-center">
                                  <img src={GEO} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Geo DMG Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[45]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}

                              {(currentCardInfo.preBattleStats[46]*100 > 13) && 
                              <div className="flex justify-between CRYO mb-0.5">
                                <div className="flex items-center">
                                  <img src={CRYO} className='w-[25px] h-[25px]' />
                                  <p className="text-white afacad-light ml-1"> Cryo DMG Bonus</p>
                                </div>
                                <div>
                                  <p className="text-white afacad-bold">
                                    {(currentCardInfo.preBattleStats[46]*100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>}

                              <div className='flex flex-col justify-start '>
                              {Object.entries(currentCardInfo.currentSetEffects).map(([key, value], index) => (
                                <div key={index}>
                                  {(value > 1) && <div className='flex justify-between items-center mb-[-5px]'>

                                    <div className="flex items-center text-left max-w-[12rem]">
                                      <img src={artifactFlowerImageGetter(key, currentCardInfo.artifactList)} className='w-[30px] h-[30px]' />
                                      <p className="text-amber-400 afacad-light ml-1 leading-tight"> {locJSON["en"][key]}</p>
                                    </div>

                                    <p className="text-amber-400 afacad-bold">x{value-(value%2)}</p>

                                  </div>}
                                </div>
                              ))}
                            </div>

                          </SimpleBar>
                        </div>
                        <div className=" p- mt-5 ml-5 flex flex-col thisIsArtifactContainer  w-[40%] w-mac">

                                {showArtifacts(currentCardInfo.artifactList, 0)}
                                {showArtifacts(currentCardInfo.artifactList, 1)}
                                {showArtifacts(currentCardInfo.artifactList, 2)}
                                {showArtifacts(currentCardInfo.artifactList, 3)}
                                {showArtifacts(currentCardInfo.artifactList, 4)}

                        </div>
                  </div>
                  
                </div>
              }
            </div>
        </div>
    </div>
    // </Tilt>

  )
}

export default CharacterCard