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

  // useEffect(() => {
  //   if (showInspector && currentShape !== null) {
  //     setPosition((prev) => ({ x: currentShape.model.attributes.position.x, y: currentShape.model.attributes.position.y }))
  //   }

  // }, [showInspector, currentShape])

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
            <label>
              <input
                type="text"
                placeholder={ text || "None" }
                value={ text }
                onChange={ textHandler }
                autoFocus
              />
            </label>
            <table className='table'>
              <tr className='tRow'><th className='tHead'>POSITION</th></tr>
              <tr className='tRow'>
                <td className='tData'>X</td>
                <td className='tData'>{ currentShape.model.attributes.position.x }</td>
                {/* {<td className='tData'>{position.x}</td>  } */}
              </tr>
              <tr className='tRow'>
                <td className='tData'>Y</td>
                <td className='tData'>{ currentShape.model.attributes.position.y }</td>
              </tr>
              <tr className='tRow'><th className='tHead'>SIZE</th></tr>
              <tr className='tRow'>
                <td className='tData'>WIDTH</td>
                <td className='tData'>{ currentShape.model.attributes.size.width }</td>
              </tr>
              <tr className='tRow'>
                <td className='tData'>HEIGHT</td>
                <td className='tData'>{ currentShape.model.attributes.size.height }</td>
              </tr>
            </table>
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
