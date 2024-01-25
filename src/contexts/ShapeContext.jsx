import { createContext, useRef, useState } from "react";

export const ShapeContext = createContext();

const ShapeContextProvider = ({ children }) => {
  const shapeRef = useRef(null);
  const elementInProgress = useRef(null);
  const [currentShape, setCurrentShape] = useState({});
  const [currentLink, setCurrentLink] = useState({});
  const [showElement, setShowElement] = useState(false);
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
      shapeRef, elementInProgress, currentShape, setCurrentShape, showElement, setShowElement, currentLink, setCurrentLink, showTitle, position, setPosition, updateShapeContext
    } }>
      { children }
    </ShapeContext.Provider>
  )
}

export default ShapeContextProvider