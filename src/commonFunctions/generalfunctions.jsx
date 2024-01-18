import { shapes, linkTools } from "jointjs";

export const createLink = (paperInstance, selectedShape, linkArr) => {
  // if (checkLink(linkArr, selectedShape)) {
  console.log('called link  ')
  const removeButton = new linkTools.Remove({
    focusOpacity: 0.5,
    rotate: true,
    distance: -20,
    offset: 20
  });
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
  link.tools = removeButton
  linkArr.current.push(link);
  paperInstance.current.model.addCell(link);
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
