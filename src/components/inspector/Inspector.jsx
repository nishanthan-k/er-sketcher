import React, { useContext } from 'react';
import { LinkContext } from '../../contexts/LinkContext';
import { ShapeContext } from '../../contexts/ShapeContext';
import ElementDetails from './ElementDetails';
import "./Inspector.scss";
import LinkDetails from './LinkDetails';

const Inspector = () => {
  const { showElement } = useContext(ShapeContext);
  const { showLink } = useContext(LinkContext);

  return (
    <div className='inspector'>
      { showElement && <ElementDetails /> }
      { showLink && <LinkDetails /> }
      { (!showElement && !showLink) && <h3 className='generalTitle'>INSPECTOR AREA</h3> }
    </div >
  );
};

export default Inspector;
