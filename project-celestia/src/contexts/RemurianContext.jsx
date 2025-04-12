import React, { createContext, useState } from 'react'
export const remurianContextObj = createContext();

function RemurianContext({children}) {

    let [remurian, setRemurian] = useState({
        username:"",
        hashcode:"",
        uid:[]
    })

  return (
    <remurianContextObj.Provider value={{remurian, setRemurian}}>
        {children}
    </remurianContextObj.Provider>
  )
}

export default RemurianContext