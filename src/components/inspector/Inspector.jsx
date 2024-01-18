import React, { useContext, useState, useEffect } from 'react';
import { PaperContext } from '../../contexts/PaperContext';
import "./Inspector.scss";

const Inspector = () => {
  const { currentShape, showInspector } = useContext(PaperContext);
  const [text, setText] = useState("");
  const [shapeTitle, setShapeTitle] = useState("");
  // let shapeTitle = "";

  useEffect(() => {
    if (showInspector && currentShape !== null) {
      setText(currentShape.model.attributes.attrs.label.text);
      let tempShape = currentShape.model.attributes.type.split(".")[1];
      if (tempShape === "Rectangle") {
        setShapeTitle("Entity")
      } else if (tempShape === "Ellipse") {
        setShapeTitle("Attribute")
      } else if (tempShape === "Polygon") {
        setShapeTitle("Relation")
      } else if (tempShape === "Circle") {
        setShapeTitle("Circle")
      }
    }
  }, [showInspector, currentShape]);

  const textHandler = (e) => {
    const newText = e.target.value;
    setText(newText);
    currentShape.model.attr("label/text", newText);
    var width = Math.max(newText.length * 7, currentShape.model.attributes.size.width);
    currentShape.model.resize(width, currentShape.model.attributes.size.height);
  };


  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   currentShape.model.attr("label/text", text);
  //   var width = Math.max(text.length * 7, currentShape.model.attributes.size.width);
  //   currentShape.model.resize(width, currentShape.model.attributes.size.height);
  // };

  return (
    <>
      { showInspector ? (
        <div className='inspector'>
          <p className='generalTitle'>PRESENTATION</p>
          <p className='shapeTitle'>{ shapeTitle }</p>
          <form action="" className='form'>
            <label>
              <input
                type="text"
                placeholder={ text || "None" }
                value={ text }
                onChange={ textHandler }
                autoFocus
                autoCapitalize=''
              />
            </label>
            {/* <button type="button" onClick={ submitHandler }>
          Submit
        </button> */}
          </form>
        </div>
      ) : (
        <div className='inspector'>
          <p className='generalTitle'>INSPECTOR AREA</p>
        </div>
      ) }
    </>
  );
};

export default Inspector;
