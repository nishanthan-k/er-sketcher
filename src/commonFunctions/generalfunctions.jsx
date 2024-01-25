import { dia, elementTools, linkTools, shapes } from "jointjs";

// tools for the link
const verticesTool = new linkTools.Vertices();
const segmentsTool = new linkTools.Segments();
const targetArrowheadTool = new linkTools.TargetArrowhead();
const removeButton = new linkTools.Remove({
  distance: 50,
  offset: 20
});
export const toolsView = new dia.ToolsView({
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
    return { x: size.width, y: size.height };
  },
  setPosition: (view, coordinates) => {
    var model = view.model;
    model.size({ width: coordinates.x, height: coordinates.y });
  },
  resetPosition: (view) => { },
});
export const toolsViewElement = new dia.ToolsView({
  tools: [removeButtonElement, boundaryToolElement, new controltButton({
    handleAttributes: { fill: "gray", cursor: "nwse-resize" },
  }),],
});


export const createLink = (paperInstance, sourceId, targetId, linkArr) => {
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
    router: {name: "normal"},
    connector: {name: "normal"} 
  });
  linkArr.current.push(link);
  paperInstance.current.model.addCell(link);
  return link;
};

export const checkLink = (linkArr, selectedShape) => {
  var status = linkArr.filter(link => ((selectedShape[1].id === link.attributes.source.id && selectedShape[0].id === link.attributes.target.id) || (selectedShape[0].id === link.attributes.source.id && selectedShape[1].id === link.attributes.target.id)))

  return status.length === 0 ? true : false;
}


export const wordFormat = (word) => {
  word = word[0].toUpperCase() + word.slice(1);
  return word;
}