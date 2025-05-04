import React, { useContext, useEffect, useState } from 'react'
import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import { remurianContextObj } from '../../contexts/RemurianContext';
import { useForm } from 'react-hook-form';
import { TfiReload } from "react-icons/tfi";
import axios from 'axios';
import CountdownTimer from './CountdownTimer';

function Validate() {

  const [resBool1, setResBool1] = useState(1);
  const [submitTimeout, setSubmitTimeout] = useState();
  const [err, setErr] = useState("");
  const {register, handleSubmit, formState:{errors}} = useForm();
  const {remurian, setRemurian} = useContext(remurianContextObj);
  const {isLoaded, isSignedIn, user} = useUser();

    useEffect(
        ()=>{
            if(user){
                setRemurian((prev)=>{
                  return {...prev, username: user?.username}
                });
            }
        }, [isLoaded]
    )

    useEffect(()=>{
      setTimeout(() => {
        setErr("")
      }, 3000);
    }, [err])

  async function handleValidate(uid){
    console.log("came inside handleValidate")
    if(remurian.hashcode === ""){
      setErr("Please click reload first!")
    } else {
      let requestBody = {
        username: remurian.username,
        uid: uid
      }
      setResBool1(0)
      let resBool = null

      if(!remurian.uid.includes(uid)){
        axios.post('http://localhost:8080/login/validate', requestBody)
        .then((res)=>{
          resBool = res
          console.log("this is resbool",resBool)
          setResBool1(1)

          if(resBool.data === true){
            console.log("in resBool true block")
            setErr("UID Validated!")
            let res = null
            axios.get(`http://localhost:8080/login/getRemurian/${remurian.username}`)
            .then((response)=>{
              res = response
              setRemurian((prev)=>{
                let updated = {
                  ...prev,
                  username: res.data.username,
                  hashcode: res.data.hashcode,
                  uid: (res.data.uid === null)?([]):(res.data.uid)
                };
                return updated;
              })
            })
            .catch((err)=>{console.log(err)})
            
          } else if (resBool.data === false){
            setErr("Validation unsuccessful")
          }
        })
        .catch((err)=>{console.log(err)})
      } else {
        setResBool1(1)
        setErr("UID already validated!")
      }
      
     
    }
  }

  async function onSubmit(formObj){
    let uid = formObj.uid;
    console.log("UID: ",uid)
    if(formObj.uid === null){
      setErr("Enter a UID")
    }
    handleValidate(uid)
  }

  async function handleClick(){
    setErr("")
    if(remurian?.username !== ""){
      let res = await axios.get(`http://localhost:8080/login/getRemurian/${remurian.username}`)
      setRemurian((prev)=>{
        let updated = {
          ...prev,
          username: res.data.username,
          hashcode: res.data.hashcode,
          uid: (res.data.uid === null)?([]):(res.data.uid)
        };
        return updated;
      })
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <p className="afacad-bold text-8xl mb-3 ml-[-8rem]">
          Validate 
        </p>
      </div>
      <div className='bg-[#666565]/42 p-5 w-[150%] text-black rounded-[1.3rem]'>
        <form onSubmit={handleSubmit(onSubmit)} className='pt-2'>
          <div className='border border-gray-300 rounded px-3 py-3 w-full mb-4 bg-black/20 text-white afacad-semi-bold'>
              {(remurian?.hashcode === "")?<>
                <div className="flex">
                  <p className='mr-2'>Click Reload</p><TfiReload className='mt-[0.25rem] mr-[0.5rem]'/>
                </div>
              </>:<>
                {remurian.hashcode}
              </>}
          </div>
          <div>
            
            <input
              id="uid"
              placeholder='Enter UID'
              {...register("uid", { required: true, minLength:9 })}
              className="border border-gray-300 rounded px-3 py-3 w-full text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
            {
              errors.uid?.message === "required" 
              && 
              <p className='w-full ring-1 drop-shadow-sm ring-[#E3E3E3] bg-white mx-1 px-4 py-2 afacad-semi-bold rounded-3xl text-amber-400'>
                *UID is atleast 9 digits long
              </p>
            }
          </div>
          <div className="flex items-center mt-3">
            {(resBool1===1)?<>
              <button type="submit" className="flex justify-center mx-1 w-[50%] ring-1 drop-shadow-sm ring-[#E3E3E3] afacad-semi-bold bg-[#B2B2B2]/42  text-white px-4 py-2 rounded-3xl hover:bg-white transition hover:text-black">
                <span>Validate</span>
              </button>
            </>:<>
              <div className="flex justify-center mx-1 w-[50%] ring-1 drop-shadow-sm ring-[#E3E3E3] afacad-semi-bold bg-gray-600/42  text-white px-4 py-2 rounded-3xl">
                <span>Validate</span>
              </div>
            </>}
            <button type='button' onClick={()=>{handleClick()}} className='flex justify-center mx-1 w-[50%] ring-1 drop-shadow-sm ring-[#E3E3E3] afacad-semi-bold bg-[#B2B2B2]/42  text-white px-4 py-2 rounded-3xl hover:bg-white transition hover:text-black'>
              <><TfiReload className='mt-[0.25rem] mr-[0.5rem]'/></> Reload
            </button>
          </div>
          {(err === "")?<>
            
          </>:<>
            <div className="flex justify-center mt-3">
              <div className="w-full ring-1 drop-shadow-sm ring-[#E3E3E3] bg-white mx-1 px-4 py-2 afacad-semi-bold rounded-3xl text-amber-800">
                {err}
              </div>
            </div>
          </>}
          
        </form>
        
      </div>
    </div>
  )
}

export default Validate