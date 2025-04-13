import React from 'react'

function CharacterStrip({rankItem}) {

  function returnCharacter(){
     switch(rankItem.avatarId){
      case 10000098: return(
      <div className='h-[75%] w-full  relative bg-[center_3rem] bg-cover  bg-no-repeat hover:bg-[center_2.5rem] ease' style={{backgroundImage: `url(${rankItem.gachaIcon})`}} >
        <div className=" absolute bg-gradient-to-b from-black to-transparent w-full h-full text-white overflow-hidden bg-contain bg-no-repeat
          flex flex-col justify-end
          hover:bg-gradient-to-b hover:from-black hover:via-transparent hover:to-transparent 
        ">
          {returnTextOverlay()}
        </div>
      </div>
      )
      case 10000026: return(
      <div className='h-[75%] w-full  relative bg-[center_0rem] bg-cover  bg-no-repeat hover:bg-[center_-0.5rem] ease' style={{backgroundImage: `url(${rankItem.gachaIcon})`}} >
        <div className=" absolute bg-gradient-to-b from-black to-transparent w-full h-full text-white overflow-hidden bg-contain bg-no-repeat       
          flex flex-col justify-end
          hover:bg-gradient-to-b hover:from-black hover:via-transparent hover:to-transparent 
         ">
            {returnTextOverlay()}
        </div>
      </div>
      )
     }
  }

  function nameGetter(){
    let category = rankItem.category
    let firstPart = category.split(':')[0].toLowerCase()
    return firstPart.charAt(0).toUpperCase()+firstPart.slice(1)
  }


  
  function returnTextOverlay(){
    return(
      <div>
        <div className="flex flex-col ml-2">
          <p className='afacad-light text-2xl'>Top</p>
          <p className='afacad-light mt-[-0.5rem]'>{(rankItem.categoryRankPercentage).toFixed(2)} %</p>
        </div>
        <div className='text overlay ml-[-0.5rem]'>
          <div className="flex  ">
            <p className="afacad-bold text-9xl vertical-text">{nameGetter()}</p>
            <div className=" flex flex-col justify-end ml-[-1rem]">
              <p className='barcode-font text-4xl vertical-text'>{nameGetter()}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full relative flex flex-col justify-end'>
        {returnCharacter()}
    </div>
  )
}

export default CharacterStrip