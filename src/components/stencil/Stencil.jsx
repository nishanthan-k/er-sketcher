import React, { useContext } from 'react'
import "./Stencil.scss"
import { Image } from 'semantic-ui-react'
import { PaperContext } from '../../contexts/PaperContext'

const Stencil = () => {
  // const {showTitle} = useContext(PaperContext);
  const { updatePaperContext } = useContext(PaperContext)

  const handleShapeClick = (shapeType) => {
    updatePaperContext("shapeRef", shapeType);
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