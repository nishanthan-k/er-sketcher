import { dia } from 'jointjs';
import React, { useContext, useEffect, useRef } from 'react';
import { createLink, deleteLink, updateLink } from '../../commonFunctions/generalfunctions';
import { createCircle, createEllipse, createRectangle, createRhombus } from '../../commonFunctions/shapeFunctions';
import { OptionContext } from '../../contexts/OptionContext';
import { PaperContext } from '../../contexts/PaperContext';

const Paper = () => {
  const createdShapes = useRef([]);
  const totalShapes = useRef(null);
  const linkChangeflag = useRef(false);
  // let selectedShape = [];
  const selectedShape = useRef([]);
  const linkArr = useRef([]);
  totalShapes.current = 0;
  const createdEntities = useRef([]);
  const linkInProgress = useRef(null);
  const oldTarget = useRef(null);
  const { paperRef, paperInstance, shapeRef } = useContext(PaperContext);
  const { addLink, removeLink, resize, removeShape, downloadCanvas } = useContext(OptionContext);
  // const paper = useRef(null);
  // let pap
  // console.log('addLink', addLink)

  const currentAddLink = useRef(addLink.current);

  useEffect(() => {
    // Update the currentAddLink value when addLink changes
    currentAddLink.current = addLink;
  }, [addLink]);

  const resizeInfo = useRef({
    isResizing: false,
    initialSize: { width: 0, height: 0 },
  });

  useEffect(() => {
    if (paperInstance.current === null) {
      const paper = new dia.Paper({
        el: paperRef.current,
        width: 900,
        height: 650,
        model: new dia.Graph(),
      });
      paperInstance.current = paper;
      // }


      paperInstance.current.on("blank:pointerclick", (event, x, y) => {
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

      paperInstance.current.on("element:pointerclick", (cellView) => {
        if (addLink.current) {
          console.log('inside addlink')
          if (selectedShape.current.length === 0) {
            selectedShape.current.push(cellView.model);
          } else if (selectedShape.current.length === 1 && selectedShape.current[0] !== cellView.model) {
            selectedShape.current.push(cellView.model);
            createLink(paperInstance, selectedShape.current, linkArr);
            selectedShape.current = [];
            // addLink.current = false;
          }
        } else if (removeShape.current) {
          console.log('inside remove shape')
          cellView.remove();
          let linkId = "";
          linkArr.current.map((link) => {
            if (link.attributes.source.id === cellView.model.id || link.attributes.target.id === cellView.model.id) {
              linkId = link.id;
              deleteLink(paperInstance, link.id, linkArr);
            }
            return [];
          });
          linkArr.current = linkArr.current.filter((link) => link.id !== linkId);
          let entityId = "";
          createdEntities.current.map((entity) => {
            if (entity.id === cellView.model.id || entity.id === cellView.model.id) {
              entityId = entity.id;
            }
            return [];
          });
          createdEntities.current = createdEntities.current.filter((entity) => entity.id !== entityId);
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
            console.log("resize onup", resizeInfo.current.isResizing);
          });
        }
      });

      paperInstance.current.on("link:pointerdown", (linkView) => {
        if (removeLink.current) {
          linkView.remove();
          deleteLink(paperInstance, linkView.model.id, linkArr);
        }
        linkInProgress.current = linkView.model;
        linkChangeflag.current = true;
        oldTarget.current = linkInProgress.current.attributes.target.id;
      });

      paperInstance.current.on("link:pointerup", (linkView) => {
        if (linkChangeflag.current && removeLink.current === false) {
          updateLink(paperInstance, linkView.model, oldTarget.current);
        }
        linkChangeflag.current = false;
      });

      paperInstance.current.on("link:pointermove", (linkView, event, x, y) => {
        if (linkInProgress.current === linkView.model) {
          linkView.model.target({ x, y });

          createdEntities.current.map((entity) => {
            let pos = entity.attributes.position;
            let wid = entity.attributes.size;
            if (x <= pos.x + wid.width && y <= pos.y + wid.height && x >= pos.x && y >= pos.y && linkChangeflag.current) {
              linkInProgress.current.remove();
              updateLink(paperInstance, linkView.model, entity.id);
              linkChangeflag.current = false;
            }
            return [];
          });
        }
      });

      paperInstance.current.on("element:pointerdblclick", (cellView) => {
        if (!resize.current) {
          const model = cellView.model;
          const text = prompt("Enter new text:", model.attr("label/text"));
          if (text !== null) {
            model.attr("label/text", text);
            // var width = Math.max(text.length * 7, model.attributes.size.width);
            // model.resize(width, model.attributes.size.height);
          }
        }
      });
    }
    // console.log('inside', addLink, removeLink, removeShape, resize, downloadCanvas);
  }, [paperRef, paperInstance, shapeRef, createdShapes, totalShapes, addLink, removeLink, removeShape, resize, downloadCanvas, selectedShape]);
  // paperRef, paperInstance, shapeRef, createdShapes, totalShapes, addLink, removeLink, removeShape, resize, downloadCanvas, selectedShape
  return (
    <div className="paper" ref={ paperRef } />
  );
}

export default Paper;