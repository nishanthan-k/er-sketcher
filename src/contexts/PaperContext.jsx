import React, { createContext, useRef } from 'react';

export const PaperContext = createContext();

export const PaperContextProvider = ({ children }) => {
  const graphRef = useRef(null);
  const paperInstance = useRef(null);
  const paperRef = useRef(null);
  const elementInProgress = useRef(null);

  return (
    <PaperContext.Provider value={ { graphRef, paperRef, paperInstance,  elementInProgress } }>
      { children }
    </PaperContext.Provider>
  );
};
