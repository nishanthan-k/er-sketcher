import { dia, linkTools } from 'jointjs';
import React, { useContext, useEffect, useRef } from 'react';
import { createLink } from '../../commonFunctions/generalfunctions';
import { createCircle, createEllipse, createRectangle, createRhombus } from '../../commonFunctions/shapeFunctions';
import { OptionContext } from '../../contexts/OptionContext';
import { PaperContext } from '../../contexts/PaperContext';
import "./Paper.scss";

const Paper = () => {
  const createdShapes = useRef([]);
  const totalShapes = useRef(null);
  // let selectedShape = [];
  const selectedShape = useRef([]);
  const linkArr = useRef([]);
  totalShapes.current = 0;
  const createdEntities = useRef([]);
  const linkInProgress = useRef(null);
  const oldTarget = useRef(null);
  const { paperRef, paperInstance, shapeRef, setPosition, setCurrentShape, setShowInspector } = useContext(PaperContext);
  const { addLink, removeLink, resize, removeShape } = useContext(OptionContext);

  // Create tools for the link
  const verticesTool = new linkTools.Vertices();
  const segmentsTool = new linkTools.Segments();
  // const sourceArrowheadTool = new linkTools.SourceArrowhead();
  const targetArrowheadTool = new linkTools.TargetArrowhead();
  const removeButton = new linkTools.Remove();

  const toolsView = new dia.ToolsView({
    tools: [targetArrowheadTool, removeButton, verticesTool, segmentsTool],
  });

  const currentAddLink = useRef(null);

  const resizeInfo = useRef({
    isResizing: false,
    initialSize: { width: 0, height: 0 },
  });

  console.log('re rendering')

  useEffect(() => {
    if (paperInstance.current === null) {
      const paper = new dia.Paper({
        el: paperRef.current,
        width: 1020,
        height: 650,
        model: new dia.Graph(),
      });
      paperInstance.current = paper;
      // }

      paperInstance.current.on("blank:pointerclick", (event, x, y) => {
        if (linkInProgress.current) {
          linkInProgress.current.removeTools(toolsView);
        }

        if (shapeRef.current === "rectangle") {
          totalShapes.current = totalShapes.current + 1;
          createRectangle(paperInstance, x, y, totalShapes, createdShapes, createdEntities);
        } else if (shapeRef.current === "ellipse") {
          totalShapes.current = totalShapes.current + 1;
          createEllipse(paperInstance, x, y, totalShapes, createdShapes, createdEntities);
        } else if (shapeRef.current === "rhombus") {
          totalShapes.current = totalShapes.current + 1;
          createRhombus(paperInstance, x, y, totalShapes, createdShapes, createdEntities);
        } else if (shapeRef.current === "circle") {
          totalShapes.current = totalShapes.current + 1;
          createCircle(paperInstance, x, y, totalShapes, createdShapes, createdEntities);
        }
        // shapeRef.current = "";
      });

      paperInstance.current.on("element:pointerdown", (cellView) => {
        if (!addLink.current && !removeLink.current && !removeShape.current && !resize.current) {
          currentAddLink.current = cellView;
          setCurrentShape(cellView)
          setShowInspector(true);
        }
      })

      paperInstance.current.on("element:pointermove", (cellView, event, x, y) => {
        setPosition((prev) => ({ x: x, y: y }))
      });

      paperInstance.current.on("element:pointerclick", (cellView) => {
        if (addLink.current) {
          console.log('inside addlink')
          if (selectedShape.current.length === 0) {
            selectedShape.current.push(cellView.model);
          } else if (selectedShape.current.length === 1 && selectedShape.current[0] !== cellView.model) {
            selectedShape.current.push(cellView.model);
            createLink(paperInstance, selectedShape.current[0].id, selectedShape.current[1].id, linkArr);
            selectedShape.current = [];
            // addLink.current = false;
          }
        } else if (removeShape.current) {
          console.log('inside remove shape')
          console.log(cellView.model.id);
          const removeShape = cellView.model;
          removeShape.remove();
        } else if (resize.current) {
          paperInstance.current.on("element:pointerdown", (cellView, event, x, y) => {
            if (cellView.model && cellView.model.isElement() && resize.current) {
              resizeInfo.current.isResizing = true;
              resizeInfo.current.initialPointerPos = { x: event.clientX, y: event.clientY };
              resizeInfo.current.initialSize = cellView.model.size();
            }
          });

          paperInstance.current.on("element:pointermove", (cellView, event, x, y) => {
            console.log("resize onmove", resizeInfo.current.isResizing);
            if (resizeInfo.current.isResizing) {
              const diffX = event.clientX - resizeInfo.current.initialPointerPos.x;
              const diffY = event.clientY - resizeInfo.current.initialPointerPos.y;

              const newWidth = Math.max(0, resizeInfo.current.initialSize.width + diffX);
              const newHeight = Math.max(0, resizeInfo.current.initialSize.height + diffY);

              cellView.model.resize(newWidth, newHeight);
            }
          });

          paperInstance.current.on("element:pointerup", (cellView) => {
            if (resizeInfo.current.isResizing === true) {
              resizeInfo.current.isResizing = false;
            }
          });
        }
      });

      paperInstance.current.on("link:pointerdown", (linkView) => {
        const updatedLink = paperInstance.current.findViewByModel(linkView.model);
        linkInProgress.current = updatedLink;
        updatedLink.addTools(toolsView);
        oldTarget.current = linkView.model.attributes.target;
        shapeRef.current = "";
      });

      paperInstance.current.on("link:pointerup", (linkView) => {
        if (!linkView.model.attributes.target.id) {
          createLink(paperInstance, linkView.model.attributes.source.id, oldTarget.current.id, linkArr);
          linkView.model.remove();
        }
        shapeRef.current = "";
      });
    }
  });

  return (
    <div className="paper" ref={ paperRef } />
  );
}

export default Paper;