import React, { createContext, useState } from 'react'
export const fetchContextObj = createContext();

function FetchContext({children}) {

    const [fetchCount, setFetchCount] = useState(0);

    return (
        <fetchContextObj.Provider value={{fetchCount, setFetchCount}}>
            {children}
        </fetchContextObj.Provider>
      )

}

export default FetchContext