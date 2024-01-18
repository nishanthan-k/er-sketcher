import { dia, linkTools, shapes } from "jointjs";

export const createLink = (paperInstance, selectedShape, linkArr) => {
  // if (checkLink(linkArr, selectedShape)) {
  const link = new shapes.standard.Link({
    source: { id: selectedShape[0].id },
    target: { id: selectedShape[1].id },
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
  paperInstance.current.model.addCell(link);
  const linkView = paperInstance.current.findViewByModel(link);

  // Create tools for the link
  // const verticesTool = new linkTools.Vertices();
  // const segmentsTool = new linkTools.Segments();
  // const sourceArrowheadTool = new linkTools.SourceArrowhead();
  const targetArrowheadTool = new linkTools.TargetArrowhead();
  const removeButton = new linkTools.Remove();

  // Add tools to the linkView
  const toolsView = new dia.ToolsView({
    tools: [targetArrowheadTool, removeButton],
  });
  linkView.addTools(toolsView);
  // link.addTools(toolsView);
  // linkArr.current.push(link);
  // return link
  // selectedShape = [];
  // } else {
  //   console.log("Link already exists");
  // }
};

export const updateLink = (paperInstance, link, newTarget) => {
  const newLink = new shapes.standard.Link({
    source: { id: link.attributes.source.id },
    target: { id: newTarget },
    attrs: {
      line: {
        stroke: "black",
        targetMarker: null,
        sourceMarker: null,
      }
    }
  });
  deleteLink(paperInstance, link.id)
  paperInstance.current.model.addCell(newLink);
  const linkView = paperInstance.current.findViewByModel(newLink);

  // Create tools for the link
  const verticesTool = new linkTools.Vertices();
  const segmentsTool = new linkTools.Segments();
  // const sourceArrowheadTool = new linkTools.SourceArrowhead();
  const targetArrowheadTool = new linkTools.TargetArrowhead();
  const removeButton = new linkTools.Remove();

  // Add tools to the linkView
  const toolsView = new dia.ToolsView({
    tools: [targetArrowheadTool, removeButton, verticesTool, segmentsTool],
  });
  linkView.addTools(toolsView);
}


export const deleteLink = (paperInstance, linkId, linkArr) => {
  const linkToRemove = paperInstance.current.model.getCell(linkId);
  if (linkToRemove) {
    linkToRemove.remove();
  }
  // paperInstance.current.model.remove();
};

export const checkLink = (linkArr, selectedShape) => {
  var status = linkArr.filter(link => ((selectedShape[1].id === link.attributes.source.id && selectedShape[0].id === link.attributes.target.id) || (selectedShape[0].id === link.attributes.source.id && selectedShape[1].id === link.attributes.target.id)))

  return status.length === 0 ? true : false;
}
