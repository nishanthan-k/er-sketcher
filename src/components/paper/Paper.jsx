import { dia } from 'jointjs';
import React, { useContext, useEffect, useRef } from 'react';
import { createLink, toolsView } from '../../commonFunctions/generalfunctions';
import { createCircle, createEllipse, createRectangle, createRhombus } from '../../commonFunctions/shapeFunctions';
import { LinkContext } from "../../contexts/LinkContext";
import { OptionContext } from '../../contexts/OptionContext';
import { PaperContext } from '../../contexts/PaperContext';
import { ShapeContext } from '../../contexts/ShapeContext';
import "./Paper.scss";

const Paper = () => {
  const createdShapes = useRef([]);
  const selectedShape = useRef([]);
  const linkArr = useRef([]);
  const createdEntities = useRef([]);
  const oldTarget = useRef(null);
  const { graphRef, paperRef, paperInstance } = useContext(PaperContext);
  const { shapeRef, elementInProgress, setPosition, setCurrentShape, setShowElement } = useContext(ShapeContext);
  const { addLink, removeLink, resize, removeShape } = useContext(OptionContext);
  const { toolsViewElement, linkInProgress, setShowLink } = useContext(LinkContext)


  const removeShapeRef = () => shapeRef.current = "";

  useEffect(() => {
    if (paperInstance.current === null) {
      const paper = new dia.Paper({
        el: paperRef.current,
        width: 1020,
        height: 650,
        model: graphRef.current,
      });

      // paper.drawGrid({
      //   name: 'mesh',
      //   args: {
      //     color: '#000000',
      //     gridsize: 10,  
      //     thickness: 10,  
      //   },
      // });

      paper.drawGrid({
        name: 'doubleMesh',
          args: [
            { color: 'red', thickness: 1 }, 
            { color: 'green', scaleFactor: 5, thickness: 5 } 
          ]
      })

      // paper.setGrid({ name: 'mesh', args: { color: 'red', thickness: 10, } });

      paperInstance.current = paper;

      // }


      // adding new shapes
      paperInstance.current.on("blank:pointerclick", (event, x, y) => {
        if (linkInProgress.current) {
          linkInProgress.current.removeTools(toolsView);
          setShowLink(false);
        }
        if (elementInProgress.current) {
          elementInProgress.current.removeTools(toolsView);
          setShowElement(false);
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
          // removeShapeRef();
        }
      });


      // adding links
      paperInstance.current.on("element:pointerclick", (cellView) => {
        if (addLink.current) {
          console.log('inside addlink')
          if (selectedShape.current.length === 0) {
            selectedShape.current.push(cellView.model);
          } else if (selectedShape.current.length === 1 && selectedShape.current[0] !== cellView.model) {
            selectedShape.current.push(cellView.model);
            createLink(paperInstance, selectedShape.current[0].id, selectedShape.current[1].id, linkArr);
            // console.log('link', link.modal.attributes.router.name)
            selectedShape.current = [];
            // addLink.current = false;
          }
        }
        // removeShapeRef();
      });


      // changing the link's target
      paperInstance.current.on("link:pointerup", (linkView) => {
        if (!linkView.model.attributes.target.id) {
          createLink(paperInstance, linkView.model.attributes.source.id, oldTarget.current.id, linkArr);
          linkView.model.remove();
        }
        removeShapeRef();
      });

      paperInstance.current.on("link:pointerdown", (linkView) => {
        console.log(linkView)
        const updatedLink = paperInstance.current.findViewByModel(linkView.model);
        linkInProgress.current = updatedLink;
        setShowLink(true);
        updatedLink.addTools(toolsView);
        oldTarget.current = linkView.model.attributes.target;
        removeShapeRef();
      });


      // set the current shape to inspector
      paperInstance.current.on("element:pointerdown", (cellView) => {
        if (!addLink.current && !removeLink.current && !removeShape.current && !resize.current) {
          setCurrentShape(cellView)
          setShowElement(true);
          const currentElement = paperInstance.current.findViewByModel(cellView.model);
          elementInProgress.current = currentElement;
          elementInProgress.current.addTools(toolsViewElement);
          // if (elementInProgress.current !== currentElement) {
          //   elementInProgress.current = currentElement;
          //   elementInProgress.current.addTools(toolsViewElement);
          // } else {
          //   elementInProgress.current = null;
          // }
          
          removeShapeRef();
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