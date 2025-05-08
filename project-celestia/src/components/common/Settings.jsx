import React from 'react'
import SimpleBar from 'simplebar-react';
import { IoMdArrowRoundBack } from "react-icons/io";
import Switcher1 from './Switcher1';

function Settings() {


  return (

    <div className='bg-white/42 backdrop-blur-md h-full w-full flex flex-col items-center justify-center '>
        <div className="bg-black/68 rounded-3xl text-white p-5 w-[60%] max-h-[70%] h-[70%] backdrop-blur-xl">
            <div className="flex justify-between items-center">
                <p className='text-[6rem] afacad-bold ml-5'>Settings</p>
                <button className='rounded-[100%] p-5 text-5xl bg-amber-400 text-white aspect-square' onClick={()=>{window.history.back()}}>
                    <IoMdArrowRoundBack />
                </button>
            </div>
            <SimpleBar className=" w-full max-h-[70%] h-[70%] p-2">
                <div className="flex items-center w-full justify-between bg-black/15 px-3 py-2 rounded-xl ">
                    <div className="w-full flex flex-col justify-center ">
                        <p className='afacad-light text-3xl'>Card Animations</p>
                        <p className="afacad-light text-amber-600">*may affect performance</p>
                    </div>
                    <Switcher1 />
                </div>
            </SimpleBar>
        </div>
    </div>

  )
}

export default Settings