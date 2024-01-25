import React, { useContext, useEffect, useState } from 'react';
import { ShapeContext } from '../../contexts/ShapeContext';
import "./ElementDetails.scss"

const ElementDetails = () => {
  const { currentShape, showElement } = useContext(ShapeContext);
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("");
  const [shapeColor, setShapeColor] = useState("");
  const [shapeTitle, setShapeTitle] = useState("");

  useEffect(() => {
    if (showElement && currentShape !== null) {
      console.log(currentShape)
      setText(currentShape.model.attributes.attrs.label.text);
      setTextColor(currentShape.model.attributes.attrs.label.fill);
      setShapeColor(currentShape.model.attributes.attrs.body.fill);
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
  }, [showElement, currentShape]);

  const textHandler = (e) => {
    const newText = e.target.value;
    setText(newText);
    currentShape.model.attr("label/text", newText);
    var width = Math.max(newText.length * 7, currentShape.model.attributes.size.width);
    currentShape.model.resize(width, currentShape.model.attributes.size.height);
  };

  const colorHandler = (e, title) => {
    const newColor = e.target.value;
    if (title === "text") {
      setTextColor(newColor);
      currentShape.model.attr("label/fill", newColor);
    } else if (title === "shape") {
      setShapeColor(newColor);
      currentShape.model.attr("body/fill", newColor);
    }
  }

  return (
    <div className='element-details'>
      <h3 className='generalTitle'>PRESENTATION</h3>
      <p className='shapeTitle'>{ shapeTitle }</p>
      <div className="elementAttributes">
        <input
          type="text"
          placeholder={ text || "Text" }
          value={ text }
          onChange={ textHandler }
          className='entityText'
          autoFocus
        />
        <label htmlFor="textColor" className='textColor-label'>
          <span className=' attribute-name'>Text Color: </span>
          <input
            type="color"
            value={ textColor }
            onChange={ (e) => colorHandler(e, "text") }
            className='textColor'
            name='textColor'
          />
        </label>
        <label htmlFor="shapeColor" className='shapeColor-label'>
          <span className=' attribute-name'>Shape Color: </span>
          <input
            type="color"
            value={ shapeColor }
            onChange={ (e) => colorHandler(e, "shape") }
            className='shapeColor'
            name='shapeColor'
          />
        </label>
        <div className="table-container">
          <table className='table'>
            <tbody className='tBody'>
              <tr className='tHeadRow'><th className='tHead'>POSITION</th></tr>
              <tr className='tRow'>
                <td className='tData attribute-name'>X</td>
                <td className='tData'>{ currentShape.model.attributes.position.x }</td>
                {/* {<td className='tData'>{position.x}</td>  } */ }
              </tr>
              <tr className='tRow'>
                <td className='tData attribute-name'>Y</td>
                <td className='tData'>{ currentShape.model.attributes.position.y }</td>
              </tr>
              <tr className='tHeadRow'><th className='tHead'>SIZE</th></tr>
              <tr className='tRow'>
                <td className='tData attribute-name'>WIDTH</td>
                <td className='tData'>{ Math.round(currentShape.model.attributes.size.width) }</td>
              </tr>
              <tr className='tRow'>
                <td className='tData attribute-name'>HEIGHT</td>
                <td className='tData'>{ Math.round(currentShape.model.attributes.size.height) }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default ElementDetails