import React, { useContext, useEffect, useState } from 'react'
import deHashStats from '../../../assets/deHashStats.json'
import {FastAverageColor} from 'fast-average-color';
import tinycolor from 'tinycolor2';
import axios from 'axios'
import weaponDictionary from '../../../assets/loc.json'
import locJSON from '../../../assets/loc.json'
import loading from '../../../assets/loading.gif'
import { MdEditSquare } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";

import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

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
import { useForm } from 'react-hook-form';
import { remurianContextObj } from '../../../contexts/RemurianContext';
import { useParams } from 'react-router-dom';
import DamageGraph from './DamageGraph';
import { fetchContextObj } from '../../../contexts/FetchContext';
import { canvasContextObj } from '../../../contexts/CanvasContext';
import DamageBarGraph from './DamageBarGraph';


function CharacterCard({item}) {

  const {remurian} = useContext(remurianContextObj);
  const { register, handleSubmit } = useForm();
  const [shades, setShades] = useState({
    GRAY:      "#B2B2B2",
    ligma:     "#E0E0E0",  
    light:     "#CCCCCC",
    lighter:   "#B2B2B2",
    abitdark:  "#999999",
    darker:    "#7F7F7F",
    dark:      "#666666"   
  });

  const params = useParams()
  const webUid = params.uid
  const [currentDamageObj, setCurrentDamageObj] = useState(null)
  const [damages, setDamages] = useState({"0":{"test":"test"}})
  const [showDamage, setShowDamage] = useState(false)
  const [err, setErr] = useState("");
  const [buildEditBool, setBuildEditBool] = useState(false);
  const [gachaImageLoaded, setGachaImageLoaded] = useState(false);
  const [cardMap, setCardMap] = useState({"0":{"test":"test"}});
  const [currentCardInfo, setCurrentCardInfo] = useState(null);
  const [iconsAsset, setIconsAsset] = useState({"0":{"test":"test"}});
  const [currentIconAsset, setCurrentIconAsset] = useState(null);
  const {fetchCount, setFetchCount} = useContext(fetchContextObj);
  const {canvasBool, setCanvasBool} = useContext(canvasContextObj);

  useEffect(()=>{
    setShowDamage(false)
    setBuildEditBool(false)
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

    const canvas = document.getElementById('starCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Custom color for the streams
    const streamColor = `${shades.light}`;

    const streams = Array.from({ length: 8 }).map((_, i) => ({
        offset: i * 190,
        amplitude: 140 + Math.random() * 40,
        speed: 0.7 + Math.random(),
        phase: Math.random() * Math.PI * 2,
        thickness: 130 + Math.random() * 40,
    }));

    let t = 0;

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save(); // Save the current state before rotation
        ctx.translate(canvas.width / 2, canvas.height / 2); // Move to the center of the canvas
        ctx.rotate((-45 * Math.PI) / 180); // Rotate 25 degrees (convert to radians)
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        for (const stream of streams) {
            ctx.beginPath();

            for (let x = 0; x < canvas.width; x += 10) {
                const y =
                    Math.sin(x * 0.005 + t * stream.speed + stream.phase) *
                        stream.amplitude +
                    canvas.height / 2 +
                    stream.offset -
                    250;

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.strokeStyle = streamColor;
            ctx.lineWidth = stream.thickness;
            ctx.shadowColor = streamColor.replace(/0\.2/, '1');
            ctx.shadowBlur = 40;
            ctx.stroke();
        }

        ctx.restore();

        t += 0.02;
        animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
    };

  }, [item.buildName, item.avatarId,item.gachaIcon,shades.lighter]);

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

    function nameCardLink(sideIcon) {
      const parts1 = sideIcon.split('_');
      const name = parts1.at(-1).split('.')[0];
      return `https://enka.network/ui/UI_NameCardPic_${name}_P.png`;
    }

    function showArtifacts(artifactList, n) {
      const equipType = switchType(n);
      if (!equipType) {
        console.log("Invalid equip type index.");
        return null;
      }

      function getMarginLeft(index) {
        const base = 42;       
        const amplitude = 9; 
        const frequency = 7.0;   
      
        const offset = Math.sin(index * frequency) * amplitude;
        return `${base + offset}%`;
      }

      function getMarginRight(index) {
        const base = 42;       
        const amplitude = 9; 
        const frequency = 7.0;   
      
        const offset = Math.sin(index * frequency) * amplitude;
        return `${base + offset}%`;
      }

      function getBorderColorByRank(rankLevel) {
        switch (rankLevel) {
          case 1:
            return 'border-gray-400';    // Common
          case 2:
            return 'border-green-500';   // Uncommon
          case 3:
            return 'border-blue-500';    // Rare
          case 4:
            return 'border-purple-500';  // Epic
          case 5:
            return 'border-yellow-400';  // Legendary
          default:
            return 'border-neutral-300'; // Fallback/default
        }
      }
      
      const lightColorImage = 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="1">
          <rect width="1" height="1" fill="${shades.lighter}" />
        </svg>
      `);
    
      for (const artifact of artifactList) {
        if (artifact.flat && artifact.flat.equipType === equipType) {
          if(equipType === switchType(0) || equipType === switchType(2) || equipType === switchType(4)){
            return (
              <div className='  -mt-2 flex h-[20%] max-h-[20%] relative ml-1.5'>
  
                  <div
                  className="rounded-full h-[140%] absolute aspect-square flex "
                  style={{ boxShadow: `0 0 0 1px #B2B2B24D` }}>
                    <div className="absolute h-[88%] big:h-[72%] w-[140%] mt-1 rounded-3xl ml-[30%] shadow-md flex flex-col justify-start py-1 pb-5 items-start"
                    style={{backgroundColor: `${shades.light}`}}
                    >
                    {artifact.flat.reliquarySubstats.map((sub, i) => (
                      <div
                        key={i}
                        className="bg-black/42 flex items-center justify-center rounded-3xl px-2 m-0.5"
                        style={{ marginLeft: getMarginLeft(i) }}
                      >
                        <img src={propIcons[sub.appendPropId]} className='h-[20px]' />
                        <p className="afacad-bold text-sm ml-1">+{sub.statValue}{getPercentSymbol(sub.appendPropId)}</p>
                      </div>))}
                  </div>

                  <div className={`hull w-full overflow-hidden rounded-full border-4  ${getBorderColorByRank(artifact.flat.rankLevel)}`}>
                    <div className="rounded-full h-full w-full blur-[0.3px]"
                      // style={{
                      //   backgroundImage: `repeating-linear-gradient(
                      //     -45deg,
                      //     ${shades.lighter},
                      //     ${shades.lighter} 10px,
                      //     transparent 10px,
                      //     transparent 20px
                      //   )`,
                      //   backgroundColor: `${shades.light}` 
                      // }}
                      style = {{
                        backgroundImage: `linear-gradient(to right, ${shades.lighter}B3, ${shades.light} ,transparent )`,
                        boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.5)'
                      }}
                    ></div>
                  </div>

                  <div className=" absolute w-full h-full aspect-square rounded-full flex ">
                      <div className="absolute mainStatBoxMac ml-[55%] mt-[72.5%] p-2 rounded-3xl flex px-3 items-center w-[100%] justify-center shadow-md"
                          style={{backgroundColor: `${shades.lighter}`}}
                        >
                        <img src={propIcons[artifact.flat.reliquaryMainstat.mainPropId]} className='w-[28px] aspect-square' />
                        <p className="afacad-bold text-2xl ml-1"
                        >+{artifact.flat.reliquaryMainstat.statValue}{getPercentSymbol(artifact.flat.reliquaryMainstat.mainPropId)}</p>
                      </div>
                      <img src={artifactIconGetter(artifact.flat.icon)} alt="" className='absolute ] aspect-square' />
                      <div className="absolute rounded-3xl afacad-bold bg-black/53 mt-[65%] levelL ml-[68%] px-1 flex justify-center items-center text-sm">
                        +{artifact.reliquary.level - 1}
                      </div>
                      
                  </div>
                </div>
  
              </div>
            )
          } else {
            return(
              <div className='  -mt-2 flex h-[20%] max-h-[20%] relative justify-end -mr-4'>
  
                  <div
                  className="rounded-full h-[140%] absolute aspect-square flex "
                  style={{ boxShadow: `0 0 0 1px #B2B2B24D` }}
                >
                
                  <div className="absolute h-[88%] w-[140%]  rounded-3xl ml-[-70%] mt-1 shadow-md flex flex-col justify-start py-1 pb-5 items-end"
                  style={{backgroundColor: `${shades.light}`}}
                  >

                    {artifact.flat.reliquarySubstats.map((sub, i) => (
                      <div
                        key={i}
                        className="bg-black/42 flex items-center justify-center rounded-3xl px-2 m-0.5"
                        style={{ marginRight: getMarginRight(i) }}
                      >
                        <img src={propIcons[sub.appendPropId]} className='h-[20px]' />
                        <p className="afacad-bold text-sm ml-1">+{sub.statValue}{getPercentSymbol(sub.appendPropId)}</p>
                      </div>))}

                  </div>

                  <div className={`hull w-full overflow-hidden rounded-full border-4 ${getBorderColorByRank(artifact.flat.rankLevel)}`}>
                    <div className="rounded-full h-full w-full blur-[0.3px]"
                      // style={{
                      //   backgroundImage: `repeating-linear-gradient(
                      //     45deg,
                      //     ${shades.lighter},
                      //     ${shades.lighter} 10px,
                      //     transparent 10px,
                      //     transparent 20px
                      //   )`,
                      //   backgroundColor: `${shades.light}` // base color
                      // }}
                      style = {{
                        backgroundImage: `linear-gradient(to left, ${shades.lighter}B3, ${shades.light} ,transparent )`,
                        boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.5)'
                      }}
                    ></div>
                  </div>

                  

                  <div className=" absolute w-full h-full aspect-square rounded-full flex ">
                      
                    
                      <div className="absolute ml-[-55%] mt-[72.5%] mainStatBoxMacAus p-2 rounded-3xl flex px-3 items-center w-[100%] justify-center shadow-md "
                        style={{backgroundColor: `${shades.lighter}`}}
                      >
                        <img src={propIcons[artifact.flat.reliquaryMainstat.mainPropId]} className='w-[28px] aspect-square' />
                        <p className="afacad-bold text-2xl ml-1"
                        >+{artifact.flat.reliquaryMainstat.statValue}{getPercentSymbol(artifact.flat.reliquaryMainstat.mainPropId)}</p>
                      </div>
                      
                      <img src={artifactIconGetter(artifact.flat.icon)} alt="" className='absolute ml-[5%] mt-[-7%] aspect-square' />
                      <div className="absolute rounded-3xl afacad-bold bg-black/53 mt-[65%] levelR ml-[11%] px-1 flex justify-center items-center text-sm">
                        +{artifact.reliquary.level - 1}
                      </div>
                  </div>
                </div>
              </div>
            )
          }
        } 
      }
      if(equipType === switchType(0) || equipType === switchType(2) || equipType === switchType(4)) {
        return (
          <div className='  -mt-2 flex h-[20%] max-h-[20%] relative ml-1.5'>

                <div
                className="rounded-full h-[140%] absolute aspect-square flex "
                style={{ boxShadow: `0 0 0 1px #B2B2B24D` }}
                >
              
                <div className="absolute h-[70%] w-[140%] mt-1 rounded-3xl ml-[30%] shadow-md bg-[#B2B2B2]"
                ></div>

                <div className={`hull w-full overflow-hidden rounded-full border-4  border-[#B2B2B2]`}>
                  <div className="rounded-full h-full w-full blur-[1px]"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        -45deg,
                        #9b9a9a,
                        #9b9a9a 10px,
                        transparent 10px,
                        transparent 20px
                      )`,
                      backgroundColor: `${'#B2B2B2'}`, boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.5)'
                    }}
                  ></div>
                </div>

                <div className=" absolute w-full h-full aspect-square rounded-full flex ">
                  <div className="absolute ml-[55%] mt-[60%] p-2 rounded-3xl flex px-3 items-center w-[100%] justify-center shadow-md bg-[#9b9a9a]"
                    >
                      
                      <p className="afacad-bold text-2xl ml-1"
                      >unequipped</p>
                    </div>
                    <img src={emptyArts[n]} alt="" className=' scale-50  aspect-square' />
                    
                </div>
              </div>

            </div>
        )
      } else {
        return (
          <div className='  -mt-2 flex h-[20%] max-h-[20%] relative justify-end '>
  
                  <div
                  className="rounded-full h-[140%] absolute aspect-square flex "
                  style={{ boxShadow: `0 0 0 1px #B2B2B24D` }}
                >
                
                  <div className="absolute h-[70%] w-[140%]  rounded-3xl ml-[-70%] mt-1 shadow-md bg-[#B2B2B2]"
                  ></div>

                  <div className={`hull w-full overflow-hidden rounded-full border-4 border-[#B2B2B2]`}>
                    <div className="rounded-full h-full w-full blur-[1px]"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          #9b9a9a,
                          #9b9a9a 10px,
                          transparent 10px,
                          transparent 20px
                        )`,
                        backgroundColor: `${'#B2B2B2'}`, boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.5)'
                      }}
                    ></div>
                  </div>

                  

                  <div className=" absolute w-full h-full aspect-square rounded-full flex ">
                  
                      <div className="absolute ml-[-55%] mt-[60%] p-2 rounded-3xl flex px-3 items-center w-[100%] justify-center shadow-md bg-[#9b9a9a]">
                        
                        <p className="afacad-bold text-2xl ml-1"
                        >unequipped</p>
                      </div>
                      <img src={emptyArts[n]} className='scale-50  aspect-square' />
                      
                  </div>
                </div>
                  

                
  
              </div>
        )
      }

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

    function nameSubmission(obj){
      console.log("form proc")
      setBuildEditBool(false);
      console.log(obj)
      

      axios.put(`http://localhost:8080/build/create`, {
        buildName: obj.buildName,
        avatarId: `${currentCardInfo.avatarId}`,
        uid: webUid
      })
      .then((res)=>{
        if(res.data){
          setErr("Success")
          setFetchCount((old)=>{
            return old+1;
          })
        } else {
          setErr("Failed")
        }
      })
      .catch((e)=>{})

    }

    useEffect(()=>{
      setTimeout(() => {
        setErr("")
      }, 3000);
    }, [err])

    function buildDeleteHandler(buildName, avatarId, uid){
      axios.put(`http://localhost:8080/build/delete`, {
        buildName: buildName,
        avatarId: avatarId,
        uid: uid
      })
      .then((res)=>{
        if(res.data){
          setErr("Success")
          setFetchCount((old)=>{
            return old-1;
          })
        } else {
          setErr("Failed")
        }
      })
      .catch((e)=>{})
    }

    function handleShowDamage(){
      setShowDamage((prev)=>{
        let updated = !prev;
        return updated;
      })

      console.log("current damage: ",currentDamageObj)

      setCurrentDamageObj(null)
    // console.log(cardMap[`${avatarIdOrBuildName(item.avatarId, item.buildName)}`])
    let identifier = avatarIdOrBuildName(item.avatarId, item.buildName);
    if(damages[identifier] === undefined){
      axios.post('http://localhost:8080/damage/getDamage', {
            uid: webUid,
            avatarId: `${item.avatarId}`,
            buildName: buildNameGetter(item.buildName),
            category: `${item.category}`
      })
      .then((res) => {
              setCurrentDamageObj(res.data)
              setDamages((prev)=>{
                let updated = {
                  ...prev,
                  [identifier]: res.data
                }
                console.log("damages: ", updated)
                return updated
              })
      })
      .catch((err) => {
              console.error('Error fetching build:', err);
      });
    } else {
      setCurrentDamageObj(damages[identifier])
    }
    }

  
    
 
  return (

    // <Tilt perspective={1000000} tiltReverse={true} className=''>
      <div id='capture-this' className='w-full h-full flex rounded-3xl relative overflow-hidden ring-[2px] ring-[#B2B2B2]/20 ' style={{
      background: `linear-gradient(to right, ${shades.light}, ${shades.lighter}, ${shades.darker}, ${shades.dark})`
    }}>
        {(canvasBool) && <canvas id="starCanvas" className="fixed top-0 right-0 w-[80%] h-full z-10 pointer-events-none rounded-3xl"/>}
        <div className='gachaImageDiv w-full h-full flex items-center  ml-[-40%] rounded-3xl '>
            {(gachaImageLoaded)?<></>:<>
                <div className="w-full h-full flex justify-center items-center z-30 absolute ">
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
        <div className="z-20 absolute flex justify-end rounded-3xl  w-full h-full ">
            <div className=' rounded-3xl w-[80%] backdrop-blur-xl border-l-[0.5px] border-[#B2B2B2]/39 rounded-l-4xl flex '>
              {
                (currentCardInfo === null)?<>
                  <div className="w-full h-full flex justify-center items-center">
                    <p className="afacad-bold text-white text-7xl">Loading...</p>
                  </div>
                </>:
                <div className="flex flex-col  w-full p-2 m-9 ">
                  <form className="flex w-full nameAndCons" onSubmit={handleSubmit(nameSubmission)}>
                    <div className="flex flex-col  ">
                      <div className="flex ">
                        <p className=" afacad-light text-white/50 text-xl">{currentCardInfo.nickname}'s</p>
                      </div>
                      <div className="flex">
                        {(buildEditBool)?<>
                          <input 
                          type="text" 
                          id='buildName' 
                          placeholder={`${(item.buildName === null)?nameGetter(item.nameTextMapHash):textTrunc(buildNameGetter(item.buildName), 12)}`}
                          {...register('buildName')}
                            className='afacad-bold text-white text-5xl max-w-[14.5rem] -m-2'
                           />
                        </>:<>
                          {/* <p className=" afacad-bold text-white text-5xl whitespace-nowrap overflow-hidden">
                            {(item.buildName === null)?<>{nameGetter(item.nameTextMapHash)}</>:<>{textTrunc(buildNameGetter(item.buildName), 12)}</>}
                          </p> */}
                          <SimpleBar
                            className="max-w-[12.8rem] w-[12.8rem] whitespace-nowrap text-left"
                            style={{ overflowY: 'hidden' }}
                          >
                            <p className="afacad-bold text-white text-5xl inline-block m-0">
                              {item.buildName === null
                                ? nameGetter(item.nameTextMapHash)
                                : buildNameGetter(item.buildName)}
                            </p>
                          </SimpleBar>
                        </>}
                      </div>
                      <div className="flex ">
                        <p className=" afacad-light text-white/50 text-xl">Lv. {currentCardInfo.level}/90</p>
                      </div>
                    </div>

                    {(currentIconAsset && !showDamage) && 
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

                        {(remurian.uid.includes(webUid)) && 
                        <>
                          {(buildEditBool) ? (
                          <>
                            {/* GREEN SUBMIT BUTTON */}
                            <button 
                              type="submit" 
                              className="ml-[2%] bg-green-700 rounded-full p-3 aspect-square"
                            >
                              <CiSaveUp1 size={30} className='stroke-1'/>
                            </button>
                          </>
                          ) : (
                            <>
                              {/* BLUE EDIT TOGGLE BUTTON */}
                              <div 
                                className={`ml-[2%]  rounded-full p-4 aspect-square`}
                                style={{backgroundColor: `${shades.ligma}`}}
                                onClick={() => {
                                  setBuildEditBool(true);
                                }}
                              >
                                <MdEditSquare size={20}/>
                              </div>
                            </>
                          )}

                          {(buildEditBool)?<>
                            <div 
                                className={`ml-[2%]  rounded-full p-4 aspect-square`}
                                style={{backgroundColor: `${shades.ligma}`}}
                                onClick={() => {
                                  setBuildEditBool(false);
                                }}
                              >
                                <RiArrowGoBackFill size={20}/>
                              </div>
                          </>:<>
                            {(currentCardInfo.buildName !== null) && <>
                              <div 
                                  className={`ml-[2%]  rounded-full p-4 aspect-square bg-red-400`}
                                  onClick={()=>{buildDeleteHandler(buildNameGetter(item.buildName), item.avatarId, webUid)}}
                                >
                                  <MdDelete size={20}/>
                              </div>
                            </>}
                          </>}

                          {(err !== "") && <p className='afacad-bold bg-amber-800 ml-[2%] p-2 rounded-3xl'>{err}</p>}
                        </>}

                      </div>
                      }

                    {showDamage &&
                      <div className="flex categoryinfobox items-center ml-[2%] min-w-[408px] w-full bg-gray-950/42 backdrop-blur-md
                       border border-[#B2B2B2]/42  rounded-full">
                        <p className='afacad-light text-[#b7b5b5]'>{currentDamageObj?.category}</p>
                        <div className="bg-white rounded-r-full h-[95%] w-[10%] m-1 flex items-center justify-center text-black">
                          <p className='vertical-text'>120%</p>
                        </div>
                      </div>
                    }

                  </form>

                  {(showDamage)?
                  <div className='flex damageContainer h-full relative'>

                        <DamageGraph data={currentDamageObj}/>
                        <DamageBarGraph data={currentDamageObj}/>

                        <div 
                        onClick={()=>{handleShowDamage()}}

                        className="absolute bottom-0 right-0 flex items-center justify-center rounded-full p-2  afacad-bold bg-amber-400 text-black hover:bg-amber-800 hover:text-white transition">
                          To Builds
                        </div>
                  </div>:
                  <div className="flex wepAndStats  h-full  relative">
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
                        <div className=" p- mt-5 ml-16 flex flex-col thisIsArtifactContainer max-h-[93%] w-[55%] w-macc ">

                                {showArtifacts(currentCardInfo.artifactList, 0)}
                                {showArtifacts(currentCardInfo.artifactList, 1)}
                                {showArtifacts(currentCardInfo.artifactList, 2)}
                                {showArtifacts(currentCardInfo.artifactList, 3)}
                                {showArtifacts(currentCardInfo.artifactList, 4)}

                        </div>
                        {(item.category !== null) && <div 
                        onClick={()=>{handleShowDamage()}}
                        className="absolute bottom-0 right-0 flex items-center justify-center rounded-full p-2  afacad-bold bg-amber-400 text-black hover:bg-amber-800 hover:text-white transition">
                          To Damage
                        </div>}
                  </div>}

                  
                  
                </div>
              }
            </div>
        </div>
    </div>
    // </Tilt>

  )
}

export default CharacterCard