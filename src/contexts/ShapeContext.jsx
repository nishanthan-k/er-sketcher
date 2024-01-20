import { createContext, useRef, useState } from "react";

export const ShapeContext = createContext();

const ShapeContextProvider = ({ children }) => {
  const shapeRef = useRef(null);
  const [currentShape, setCurrentShape] = useState({});
  const [currentLink, setCurrentLink] = useState({});
  const [showInspector, setShowInspector] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [position, setPosition] = useState({
    x: "",
    y: ""
  });
  
  const updateShapeContext = (item, value) => {
    if (item === "shapeRef") {
      shapeRef.current = value;
      setShowTitle(false);
    }
  }

  return (
    <ShapeContext.Provider value={ {
      shapeRef, currentShape, setCurrentShape, showInspector, setShowInspector, currentLink, setCurrentLink, showTitle, position, setPosition, updateShapeContext
    } }>
      { children }
    </ShapeContext.Provider>
  )
}

export default ShapeContextProvider