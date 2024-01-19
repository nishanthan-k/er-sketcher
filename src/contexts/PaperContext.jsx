import React, { createContext, useRef, useState } from 'react';

export const PaperContext = createContext();

export const PaperContextProvider = ({ children }) => {
  const graphRef = useRef(null);
  const paperInstance = useRef(null);
  const paperRef = useRef(null);
  const [showTitle, setShowTitle] = useState(true);
  const shapeRef = useRef(null);
  
  const updatePaperContext = (item, value) => {
    if (item === "shapeRef") {
      shapeRef.current = value;
      setShowTitle(false);
    }
  }

  return (
    <PaperContext.Provider value={ { showTitle, graphRef, paperRef, paperInstance, shapeRef, updatePaperContext } }>
      { children }
    </PaperContext.Provider>
  );
};
