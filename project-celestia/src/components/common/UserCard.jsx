import React from 'react'

function UserCard(props) {
    const cardInfo = props.props;
    console.log(cardInfo)
  return (
    //w:h is 21:10 please make sure
    <div className=' text-black  w-[31.5rem] h-[15rem]'>

        <div className="z-0 bg-cover bg-center h-full w-full rounded-md" style={{backgroundImage: `url(${cardInfo.nameCardLink})`}}>
            <div className=" bg-gray-800/42 backdrop-blur-xs w-[31.5rem] h-[17rem] rounded-md absolute flex justify-end">
                <div className="absolute text-white mr-[28.5rem] -rotate-90 mt-10 flex libre-baskerville-regular backdrop-blur-xs rounded-4xl">
                    <p>AR:</p>
                    <p>{cardInfo.level}</p>
                </div>
                <div className=" h-full w-[30rem] rounded-lg border-2 border-dashed  border-white/42">
                    <div className="flex flex-col"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard