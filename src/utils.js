function degToRad(degrees) {
  return Math.PI * degrees / 180.0;
}

function radToDeg(radians) {
  return 180.0 * radians / Math.PI;
}

function rotate(point, center, degrees) {
  if (degrees) {
    radians = degToRad(degrees);
  } else {
    radians = 0;
  }
  
  let cosA = Math.cos(radians);
  let sinA = Math.sin(radians);
  let xp = point[0];
  let yp = point[1];
  let xc = center[0];
  let yc = center[1];
  let x = (xp * cosA) - (yp * sinA) + xc;
  let y = (xp * sinA) + (yp * cosA) + yc;
  
  point[0] = x;
  point[1] = y;
}

