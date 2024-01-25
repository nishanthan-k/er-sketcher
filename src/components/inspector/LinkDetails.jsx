import React, { useContext, useEffect, useState } from 'react'
import { LinkContext } from '../../contexts/LinkContext';
import "./LinkDetails.scss"

const LinkDetails = () => {
  const { linkInProgress } = useContext(LinkContext);
  const [strokeType, setStrokeType] = useState('');
  const [strokeColor, setStrokeColor] = useState('');
  const [strokeWidth, setStrokeWidth] = useState('');
  const [router, setRouter] = useState('');
  const [connector, setConnector] = useState('');
  const routerOptions = ["Normal", "Manhattan", "Metro", "Orthogonal"]
  const connectorOptions = ["Normal", "Rounded", "Straight", "Jumpover", "Smooth", "Curve"]


  useEffect(() => {
    if (linkInProgress.current !== null) {
      setStrokeColor(linkInProgress.current.model.attributes.attrs.line.stroke)

      let type = linkInProgress.current.model.attributes.type;
      type = type.split(".").map(ele => ele[0].toUpperCase() + ele.slice(1) + " ")
      setStrokeType(type)

      setStrokeWidth(linkInProgress.current.model.attributes.attrs.line.strokeWidth)

      let rout = linkInProgress.current.model.attributes.router.name
      rout = rout[0].toUpperCase() + rout.slice(1);
      setRouter(rout)

      let connect = linkInProgress.current.model.attributes.connector.name
      connect = connect[0].toUpperCase() + connect.slice(1)
      setConnector(connect)
    }
  }, [linkInProgress]);

  const colorHandler = (e) => {
    const newColor = e.target.value;
    setStrokeColor(newColor)
    linkInProgress.current.model.attr("line/stroke", newColor)
  }

  const widthHandler = (e) => {
    const newWidth = e.target.value;
    setStrokeWidth(newWidth)
    linkInProgress.current.model.attr("line/strokeWidth", newWidth)
  }

  const routerHandler = (e) => {
    const newRouter = e.target.value;
    linkInProgress.current.model.router(newRouter.toLowerCase())
    setRouter(newRouter)
  }

  const connectorHandler = (e) => {
    const newConnector = e.target.value;
    linkInProgress.current.model.connector(newConnector.toLowerCase())
    setConnector(newConnector)
  }

  console.log(linkInProgress.current.model.attributes)

  return (
    <div className='link-details'>
      <h2>{ strokeType }</h2>
      <label htmlFor="strokeWidth" className='strokeWidth-label'>
        <span className='attribute-name'>Stroke Width: </span>
        <input
          type="text"
          value={ strokeWidth }
          onChange={ (e) => widthHandler(e, "shape") }
          className='strokeWidth'
          name='strokeWidth'
        />
      </label>
      <label htmlFor="strokeColor" className='strokeColor-label'>
        <span className='attribute-name'>Stroke Color: </span>
        <input
          type="color"
          value={ strokeColor }
          onChange={ (e) => colorHandler(e) }
          className='strokeColor'
          name='strokeColor'
        />
      </label>
      <div className='router'>
        <span className='attribute-name'>Router</span>
        <select onChange={ routerHandler } value={ router } >
          { routerOptions.map((opt, key) => (
            <option value={ opt } key={ key }>{ opt }</option>
          )) }
        </select>
      </div>
      <div className='connector'>
        <span className='attribute-name'>Connector</span>
        <select onChange={ connectorHandler } value={ connector }>
          { connectorOptions.map((opt, key) => (
            <option value={ opt } key={ key }>{ opt }</option>
          )) }
        </select>
      </div>
    </div>
  )
}

export default LinkDetails