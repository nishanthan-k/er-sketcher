import { dia, elementTools, linkTools } from "jointjs";
import { createContext, useRef, useState } from "react";

export const ShapeContext = createContext();

const ShapeContextProvider = ({ children }) => {
  const shapeRef = useRef(null);
  const [currentShape, setCurrentShape] = useState({});
  const [showInspector, setShowInspector] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [position, setPosition] = useState({
    x: "",
    y: ""
  });

  // Create tools for the link
  const verticesTool = new linkTools.Vertices();
  const segmentsTool = new linkTools.Segments();
  // const sourceArrowheadTool = new linkTools.SourceArrowhead();
  const targetArrowheadTool = new linkTools.TargetArrowhead();
  const removeButton = new linkTools.Remove({
    distance: 50,
    offset: 20
  });

  const toolsView = new dia.ToolsView({
    tools: [targetArrowheadTool, removeButton, verticesTool, segmentsTool],
  });

  const boundaryToolElement = new elementTools.Boundary({
    padding: 10,
    rotate: true,
    useModelGeometry: true,
  });
  const removeButtonElement = new elementTools.Remove({
    distance: 20,
    offset: 20
  });

  const toolsViewElement = new dia.ToolsView({
    tools: [removeButtonElement, boundaryToolElement],
  });


  const updateShapeContext = (item, value) => {
    if (item === "shapeRef") {
      shapeRef.current = value;
      setShowTitle(false);
    }
  }

  return (
    <ShapeContext.Provider value={ {
      shapeRef, currentShape, setCurrentShape, showInspector, setShowInspector, showTitle, position, setPosition, toolsView, toolsViewElement, updateShapeContext
    } }>
      { children }
    </ShapeContext.Provider>
  )
}

export default ShapeContextProvider