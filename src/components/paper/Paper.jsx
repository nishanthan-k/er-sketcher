import { dia } from 'jointjs';
import React, { useContext, useEffect, useRef } from 'react';
import { createLink } from '../../commonFunctions/generalfunctions';
import { createCircle, createEllipse, createRectangle, createRhombus } from '../../commonFunctions/shapeFunctions';
import { OptionContext } from '../../contexts/OptionContext';
import { PaperContext } from '../../contexts/PaperContext';
import "./Paper.scss";
import { ShapeContext } from '../../contexts/ShapeContext';

const Paper = () => {
  const createdShapes = useRef([]);
  // let selectedShape = [];
  const selectedShape = useRef([]);
  const linkArr = useRef([]);
  const createdEntities = useRef([]);
  const linkInProgress = useRef(null);
  const elementInProgress = useRef(null);
  const oldTarget = useRef(null);
  const { graphRef, paperRef, paperInstance } = useContext(PaperContext);
  const { shapeRef, setPosition, setCurrentShape, setShowInspector, toolsView, toolsViewElement, } = useContext(ShapeContext);
  const { addLink, removeLink, resize, removeShape } = useContext(OptionContext);


  const currentAddLink = useRef(null);

  const resizeInfo = useRef({
    isResizing: false,
    initialSize: { width: 0, height: 0 },
  });

  useEffect(() => {
    if (paperInstance.current === null) {
      const paper = new dia.Paper({
        el: paperRef.current,
        width: 1020,
        height: 650,
        model: graphRef.current,
      });
      paperInstance.current = paper;
      // }


      // adding new shapes
      paperInstance.current.on("blank:pointerclick", (event, x, y) => {
        if (linkInProgress.current) {
          linkInProgress.current.removeTools(toolsView);
        }
        if (elementInProgress.current) {
          elementInProgress.current.removeTools(toolsView);
        }

        if (!addLink.current) {
          if (shapeRef.current === "rectangle") {
            createRectangle(paperInstance, x, y, createdShapes, createdEntities);
          } else if (shapeRef.current === "ellipse") {
            createEllipse(paperInstance, x, y, createdShapes, createdEntities);
          } else if (shapeRef.current === "rhombus") {
            createRhombus(paperInstance, x, y, createdShapes, createdEntities);
          } else if (shapeRef.current === "circle") {
            createCircle(paperInstance, x, y, createdShapes, createdEntities);
          }
          // shapeRef.current = "";
        }
      });


      // adding links, removing shapes, resizing shapes
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


      // changing the link's target
      paperInstance.current.on("link:pointerup", (linkView) => {
        if (!linkView.model.attributes.target.id) {
          createLink(paperInstance, linkView.model.attributes.source.id, oldTarget.current.id, linkArr);
          linkView.model.remove();
        }
        shapeRef.current = "";
      });

      paperInstance.current.on("link:pointerdown", (linkView) => {
        const updatedLink = paperInstance.current.findViewByModel(linkView.model);
        linkInProgress.current = updatedLink;
        updatedLink.addTools(toolsView);
        oldTarget.current = linkView.model.attributes.target;
        shapeRef.current = "";
      });
  

      // set the current shape to inspector
      paperInstance.current.on("element:pointerdown", (cellView) => {
        if (!addLink.current && !removeLink.current && !removeShape.current && !resize.current) {
          currentAddLink.current = cellView;
          setCurrentShape(cellView)
          setShowInspector(true);
          const currentElement = paperInstance.current.findViewByModel(cellView.model);
          elementInProgress.current = currentElement;
          elementInProgress.current.addTools(toolsViewElement);
          shapeRef.current = "";
        }
      })

      
      // tracking the position of the current shape
      paperInstance.current.on("element:pointermove", (cellView, event, x, y) => {
        setPosition((prev) => ({ x: x, y: y }))
      });
    }
  });

  return (
    <div className="paper" ref={ paperRef } />
  );
}

export default Paper;