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
    } else if (item === "downloadCanvas" || item === "exportToJson" || item === "uploadJson") {
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
            className={ `export-To-Json-btn ${activeButton === "exportToJson" ? 'active' : ''}` }
            onClick={ () => handleUpdateContext("exportToJson") }
            primary={ activeButton === "exportToJson" }
            icon="share square"
            size='large'
          />
        </div>
        <div className="upload-Json">
          <p className={ "descText show-upload-Json" }>Upload JSON</p>
          <Button
            className={ `upload-Json-btn ${activeButton === "uploadJson" ? 'active' : ''}` }
            onClick={ () => handleUpdateContext("uploadJson") }
            primary={ activeButton === "uploadJson" }
            icon="upload"
            size='large'
          />
        </div>
      </Segment>
    </GridRow>
  );
}

export default Options;
