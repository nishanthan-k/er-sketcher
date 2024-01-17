import React, { useContext, useState } from 'react';
import { Button, GridRow, Segment } from 'semantic-ui-react';
import "./Options.scss";
import { OptionContext } from '../../contexts/OptionContext';

const Options = () => {
  const { updateContext } = useContext(OptionContext);
  const [activeButton, setActiveButton] = useState(null);

  const handleUpdateContext = (item) => {
    updateContext(item);
    if (activeButton === item) {
      setActiveButton(null)
    } else if (item === "downloadCanvas" || item === "exportToJson") {
      setActiveButton(item);
      setTimeout(() => {
        setActiveButton("");
      }, 1500);
    } else {
      setActiveButton(item);
    }
  };

  return (
    <GridRow className='option-container'>
      <Segment className='options'>
        <div className="add-link">
          <p className={ "descText show-add-link" }>Add Link</p>
          <Button
            className={ `add-link-btn ${activeButton === "addLink" ? 'active-add-link' : ''}` }
            onClick={ () => handleUpdateContext("addLink") }
            primary={ activeButton === "addLink" }
            icon="linkify"
            size='large'
          />
        </div>
        <div className="remove-link">
          <p className={ "descText show-remove-link" }>Remove Link</p>
          <Button
            className={ `remove-link-btn ${activeButton === "removeLink" ? 'active' : ''}` }
            onClick={ () => handleUpdateContext("removeLink") }
            primary={ activeButton === "removeLink" }
            icon="unlinkify"
            size='large'
          />
        </div>
        <div className="resize">
          <p className={ "descText show-resize" }>Resize</p>
          <Button
            className={ `resize-btn ${activeButton === "resize" ? 'active' : ''}` }
            onClick={ () => handleUpdateContext("resize") }
            primary={ activeButton === "resize" }
            icon="move"
            size='large'
          />
        </div>
        <div className="remove-shape">
          <p className={ "descText show-remove-shape" }>Remove Element</p>
          <Button
            className={ `remove-shape-btn ${activeButton === "removeShape" ? 'active' : ''}` }
            onClick={ () => handleUpdateContext("removeShape") }
            primary={ activeButton === "removeShape" }
            icon="remove circle"
            size='large'
          />
        </div>
        <div className="download-canvas">
          <p className={ "descText show-download-canvas" }>Download Image</p>
          <Button
            className={ `download-canvas-btn ${activeButton === "removeShape" ? 'active' : ''}` }
            onClick={ () => handleUpdateContext("downloadCanvas") }
            primary={ activeButton === "downloadCanvas" }
            icon="download"
            size='large'
          />
        </div>
        <div className="export-To-Json">
          <p className={ "descText show-export-To-Json" }>Download JSON</p>
          <Button
            className={ `export-To-Json-btn ${activeButton === "removeShape" ? 'active' : ''}` }
            onClick={ () => handleUpdateContext("exportToJson") }
            primary={ activeButton === "exportToJson" }
            icon="share square"
            size='large'
          />
        </div>
      </Segment>
    </GridRow>
  );
}

export default Options;
