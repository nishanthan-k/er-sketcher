import React, { createContext, useRef, useState } from 'react';

export const PaperContext = createContext();

export const PaperContextProvider = ({ children }) => {
  const paperInstance = useRef(null);
  const paperRef = useRef(null);
  const shapeRef = useRef(null);
  const [showTitle, setShowTitle] = useState(true);
  const [currentShape, setCurrentShape] = useState({});
  const [showInspector, setShowInspector] = useState(false);

  const updatePaperContext = (item, value) => {
    if (item === "shapeRef") {
      // setShapeRef(value);
      shapeRef.current = value;
      setShowTitle(false);
    }
  }

  return (
    <PaperContext.Provider value={ { showTitle, paperRef, paperInstance, shapeRef, currentShape, setCurrentShape, showInspector, setShowInspector, updatePaperContext } }>
      { children }
    </PaperContext.Provider>
  );
};
