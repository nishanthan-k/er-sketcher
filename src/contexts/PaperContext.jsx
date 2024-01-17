import React, { createContext, useRef } from 'react';

export const PaperContext = createContext();

export const PaperContextProvider = ({ children }) => {
  const paperInstance = useRef(null);
  const paperRef = useRef(null);
  const shapeRef = useRef(null);
  const paper = useRef(false);
  // const [paperRef, setPaperRef] = useState("");
  // const [shapeRef, setShapeRef] = useState("");
  // const [paperInstance, setPaperInstance] = useState("");

  const updatePaperContext = (item, value) => {
    if (item === "shapeRef") {
      // setShapeRef(value);
      shapeRef.current = value;
    }
  }

  return (
    <PaperContext.Provider value={ { paper, paperRef, paperInstance, shapeRef, updatePaperContext } }>
      { children }
    </PaperContext.Provider>
  );
};
