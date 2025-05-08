import React, { createContext, useState } from 'react'
export const canvasContextObj = createContext();

function CanvasContext({children}) {

    const [canvasBool, setCanvasBool] = useState(false);

    return (
        <canvasContextObj.Provider value={{canvasBool, setCanvasBool}}>
            {children}
        </canvasContextObj.Provider>
      )
    
}

export default CanvasContext