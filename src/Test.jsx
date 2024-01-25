import React, { useEffect } from 'react';
import * as joint from 'jointjs';

const Test = () => {
  useEffect(() => {

    const paper = new joint.dia.Paper({
      el: document.getElementById('paper-container'),
      width: 800,
      height: 600,
      gridSize: 10,
      drawGrid: { name: "mesh", color: "#a1bbce" },
      model: new joint.dia.Graph(),
    });

    // paper.drawGrid({
    //   name: 'mesh',
    //   args: {
    //     color: 'red',
    //     // gridsize: 10,
    //     thickness: 10,
    //   }
    // })

    // paper.drawGrid({
    //   name: 'doubleMesh',
    //   args: [
    //     { color: 'red', thickness: 1   },
    //     { color: 'green', scaleFactor: 5, thickness: 5 }
    //   ]
    // })

    // paper.setGrid({ name: 'dot', args: { color: 'red' } });

    // paper.setGrid(20)

    const rect = new joint.shapes.basic.Rect({
      position: { x: 100, y: 100 },
      size: { width: 100, height: 40 },
      attrs: { rect: { fill: 'skyblue' }, text: { text: 'Rect' } },
    });

    paper.model.addCell(rect);
  }, []);

  return <div id="paper-container" style={ { backgroundColor: "pink", borderColor: "red" } }></div>;

};

export default Test;
