import React, { useContext, useRef, useState } from 'react'
import { Image } from 'semantic-ui-react'
import { ShapeContext } from '../../contexts/ShapeContext'
import "./Stencil.scss"

const Stencil = () => {
  const { updateShapeContext } = useContext(ShapeContext)
  const [selectedShape, setSelectedShape] = useState(null);

  const handleShapeClick = (shapeType) => {
    setSelectedShape(shapeType);
    updateShapeContext("shapeRef", shapeType);
  };


  return (
    <div className='stencil'>
      <div className="standard">
        <div className={ `${selectedShape === "rectangle" ? 'img-container' : 'container'}` }>
          <Image className='img' onClick={ () => handleShapeClick("rectangle") } src={ require("../../assets/shapes/rectangle.png") } />
        </div>
        <div className={ `${selectedShape === "ellipse" ? 'img-container' : 'container'}` }>
          <Image className="img" onClick={ () => handleShapeClick("ellipse") } src={ require("../../assets/shapes/ellipse.png") } />
        </div>
        <div className={ `${selectedShape === "rhombus" ? 'img-container' : 'container'}` }>
          <Image className="img" onClick={ () => handleShapeClick("rhombus") } src={ require("../../assets/shapes/rhombus.png") } />
        </div>
        <div className={ `${selectedShape === "circle" ? 'img-container' : 'container'}` }>
          <Image className="img" onClick={ () => handleShapeClick("circle") } src={ require("../../assets/shapes/circle.png") } />
        </div>
      </div>
    </div>
  )
}

export default Stencil