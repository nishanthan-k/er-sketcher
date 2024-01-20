import { dia, elementTools, linkTools, shapes } from "jointjs";
import { createContext, useContext } from "react";
import { ShapeContext } from "./ShapeContext";

export const LinkContext = createContext();

const LinkContextProvider = ({ children }) => {
  const { setPosition } = useContext(ShapeContext)

  // tools for the link
  const verticesTool = new linkTools.Vertices();
  const segmentsTool = new linkTools.Segments();
  const targetArrowheadTool = new linkTools.TargetArrowhead();
  const removeButton = new linkTools.Remove({
    distance: 50,
    offset: 20
  });
  const toolsViewLink = new dia.ToolsView({
    tools: [targetArrowheadTool, removeButton, verticesTool, segmentsTool],
  });


  // tools for element
  const boundaryToolElement = new elementTools.Boundary({
    padding: 10,
    rotate: true,
    useModelGeometry: true,
  });
  const removeButtonElement = new elementTools.Remove({
    distance: 20,
    offset: 20
  });
  const controltButton = elementTools.Control.extend({
    getPosition: (view) => {
      var model = view.model;
      var size = model.size();
      setPosition((prev) => ({ x: prev.x + 10, y: prev.y + 10 }))
      return { x: size.width, y: size.height };
    },

    setPosition: (view, coordinates) => {
      var model = view.model;
      model.size({ width: coordinates.x, height: coordinates.y });
    },
    resetPosition: (view) => { },
  });
  const toolsViewElement = new dia.ToolsView({
    tools: [removeButtonElement, boundaryToolElement, new controltButton({
      handleAttributes: { fill: "gray", cursor: "nwse-resize" },
    }),],
  });


  const createLink = (paperInstance, sourceId, targetId, linkArr) => {
    const link = new shapes.standard.Link({
      source: { id: sourceId },
      target: { id: targetId },
      attrs: {
        line: {
          stroke: "black",
          targetMarker: null,
          sourceMarker: null,
        },
      },
      // router: {name: "rightAngle"},
      // connector: {name: "rounded"} 
    });
    linkArr.current.push(link);
    paperInstance.current.model.addCell(link);
    return link;
  };

  return (
    <LinkContext.Provider value={ { toolsViewLink, toolsViewElement, createLink } }>
      { children }
    </LinkContext.Provider>
  )
}

export default LinkContextProvider;