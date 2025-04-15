// components/ScrollItem.jsx
import { motion, useTransform } from 'framer-motion';

export default function ScrollItem({ item, index, itemY, padding, viewHeight, scrollY, rawIndex, itemHeight, onClick }) {
  const offset = useTransform(scrollY, (v) => (itemY + padding - v - viewHeight / 2 + itemHeight / 2) / itemHeight);
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o) * 0.1, 0.4));
  const opacity = useTransform(offset, (o) => 1 - Math.min(Math.abs(o) * 0.3, 0.7));

  function nameGetter(){
    let category = item.category
    let firstPart = category.split(':')[0].toLowerCase()
    return firstPart.charAt(0).toUpperCase()+firstPart.slice(1)
  }

  function buildNameGetter(text){
    const parts = text.split('|:AVATAR_ID:|=')
    return parts[0]
  }

  function cvGetter(cv){
    if(cv > 300){
      return (
        <div
        className=" rounded bg-[#ae1d1d] text-white text-[80%] "
      >
        <div className='rounded text-white shimmer-bg px-1'>
          CV {cv}
        </div>
      </div>
      )
    }
    else if(cv > 250){
      return (
        <div
        className=" rounded text-black bg-[#00eaff] text-[80%] "
      >
        <div className='rounded text-black shimmer-bg px-1'>
          CV {cv}
        </div>
      </div>
      )
    }
    else if(cv > 220){
      return (
        <div
        className=" rounded bg-amber-400 text-black text-[80%] "
      >
        <div className='rounded text-black shimmer-bg px-1'>
          CV {cv}
        </div>
      </div>
      )
    }
    else if(cv > 200){
      return (
        <div
        className=" rounded bg-amber-300 text-black text-[80%] "
      >
        <div className='rounded text-black px-1'>
          CV {cv}
        </div>
      </div>
      )
    }
    else if(cv > 180){
      return (<div className="px-1 rounded bg-[#7e11b9] text-[80%]">CV {cv}</div>)
    }
    else{
      return (<div className="px-1 rounded bg-[#577de5] text-black text-[80%]">CV {cv}</div>)
    }
  }

  function nameCardLink(sideIcon) {
    const parts1 = sideIcon.split('_');
    const name = parts1.at(-1).split('.')[0];
    return `https://enka.network/ui/UI_NameCardPic_${name}_P.png`;
  }
  

  return (
    <motion.div
  className="absolute left-0 w-96 h-28 rounded-xl p-6 text-white shadow-lg text-right cursor-pointer overflow-hidden"
  style={{
    top: itemY + padding,
    scale,
    opacity,
    zIndex: 100 - Math.abs(index - rawIndex),
  }}
  onClick={() => onClick(index)}
>
  {/* Background image layer */}
  <div
    className="absolute inset-0 z-0 bg-cover bg-center scale-110"
    style={{
      backgroundImage: `url(${nameCardLink(item.sideIcon)})`,
      filter: 'blur(1.3px)'
    }}
  />

  
  {/* Foreground content layer */}
  <div className='relative z-10 w-full h-full flex justify-end   rounded-xl'>
    <div className='w-[83%] flex justify-between items-center'>
      <div className='ml-1 h-[120%]'>
        <img src={item.sideIcon} className='w-full h-full rounded-full bg-black/42' />
      </div>
      <div className="flex flex-col -ml-1 w-[70%]">
        <div className="flex justify-end">
          <div className="flex-col flex  p-1 rounded-md">
            <div className="text-2xl libre-baskerville-bold truncate whitespace-nowrap overflow-hidden text-ellipsis">
              {(item.buildName) ? (buildNameGetter(item.buildName)) : (nameGetter())}
            </div>
            <div className="text-md text-white/95">Top {(item.categoryRankPercentage).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex justify-end mt-1 mb-1 afacad-light">
          {cvGetter((item.cv).toFixed(2))}
        </div>
      </div>
    </div>
  </div>
</motion.div>

  );
}
