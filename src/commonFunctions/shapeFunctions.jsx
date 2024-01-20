import { shapes } from "jointjs";

export const createRectangle = (paperInstance, x, y, createdShapes, createdEntities) => {
  const rect = new shapes.standard.Rectangle();

  rect.position(x, y);
  rect.resize(110, 50);
  rect.attr('root/title', 'joint.shapes.standard.Rectangle');
  rect.attr('label/text', 'Entity');
  rect.attr('body/fill', 'skyblue');
  rect.attr("resizable", true);
  rect.attr("body/rx", 5);
  createdShapes.current.push(rect);
  createdEntities.current.push(rect);
  paperInstance.current.model.addCell(rect);
};

export const createEllipse = (paperInstance, x, y, createdShapes, createdEntities) => {
  var ellipse = new shapes.standard.Ellipse();
  ellipse.resize(140, 60);
  ellipse.position(x, y);
  ellipse.attr('root/title', 'joint.shapes.standard.Ellipse');
  ellipse.attr('label/text', 'Attribute');
  ellipse.attr('body/fill', 'lightcoral');
  createdShapes.current.push(ellipse);
  createdEntities.current.push(ellipse);
  paperInstance.current.model.addCell(ellipse);
};

export const createRhombus = (paperInstance, x, y, createdShapes, createdEntities) => {
  var polygon = new shapes.standard.Polygon();
  polygon.resize(120, 80);
  polygon.position(x, y);
  polygon.attr('root/title', 'joint.shapes.standard.Polygon');
  polygon.attr('label/text', 'Relation');
  polygon.attr('body/refPoints', '0,10 10,0 20,10 10,20');
  polygon.attr('body/fill', 'violet');
  createdShapes.current.push(polygon);
  createdEntities.current.push(polygon);
  paperInstance.current.model.addCell(polygon);
};

export const createCircle = (paperInstance, x, y, createdShapes, createdEntities) => {
  var circle = new shapes.standard.Circle();
  circle.resize(80, 80);
  circle.position(x, y);
  circle.attr('root/title', 'joint.shapes.standard.Circle');
  circle.attr('label/text', 'Circle');
  circle.attr('body/fill', 'yellow');
  createdShapes.current.push(circle);
  createdEntities.current.push(circle)
  paperInstance.current.model.addCell(circle);
};