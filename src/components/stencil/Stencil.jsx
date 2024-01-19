import React, { useContext } from 'react'
import { Image } from 'semantic-ui-react'
import { ShapeContext } from '../../contexts/ShapeContext'
import "./Stencil.scss"

const Stencil = () => {
  const { updateShapeContext } = useContext(ShapeContext)

  const handleShapeClick = (shapeType) => {
    updateShapeContext("shapeRef", shapeType);
  };

  return (
    <div className='stencil'>
      <div className="standard">
        <Image className="img" onClick={ () => handleShapeClick("rectangle") } src={ require("../../assets/shapes/rectangle.png") } />
        <Image className="img" onClick={ () => handleShapeClick("ellipse") } src={ require("../../assets/shapes/ellipse.png") } />
        <Image className="img" onClick={ () => handleShapeClick("rhombus") } src={ require("../../assets/shapes/rhombus.png") } />
        <Image className="img" onClick={ () => handleShapeClick("circle") } src={ require("../../assets/shapes/circle.png") } />
      </div>
    </div>
  )
}

export default Stencil