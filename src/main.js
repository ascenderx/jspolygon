let app;

window.addEventListener('load', () => {
  let divContent = document.getElementById('divContent');
  divContent.onselectstart = () => false;
  divContent.ondblclick = (event) => {
    event.preventDefault();
  };
  
  let cvs = document.getElementById('cvs');
  cvs.width = cvs.parentElement.offsetWidth;
  cvs.height = cvs.parentElement.offsetHeight;
  
  let numSides = 5;
  let radius = 100;
  let rotation = 0;
  let speed = 1;
  app = new Application(cvs, numSides, radius, rotation);
  app.polygon.rotationSpeed = speed;
  
  const sldNumSides = document.getElementById('sldNumSides');
  const sldRadius = document.getElementById('sldRadius');
  const sldSpeed = document.getElementById('sldSpeed');
  const lblNumSides = document.getElementById('lblNumSides');
  const lblRadius = document.getElementById('lblRadius');
  const lblSpeed = document.getElementById('lblSpeed');
  const chkCircle = document.getElementById('chkCircle');
  const chkPolygram = document.getElementById('chkPolygram');
  
  sldNumSides.min = 3;
  sldNumSides.max = 25;
  sldNumSides.value = numSides;
  sldNumSides.addEventListener('input', () => {
    app.polygon.length = parseInt(sldNumSides.value);
    lblNumSides.innerText = sldNumSides.value;
  });
  lblNumSides.innerText = numSides;
  
  sldRadius.min = 10;
  sldRadius.max = (Math.min(cvs.width, cvs.height) * 0.5) - 5;
  sldRadius.value = radius;
  sldRadius.addEventListener('input', () => {
    app.polygon.radius = parseInt(sldRadius.value);
    lblRadius.innerText = sldRadius.value;
  });
  lblRadius.innerText = radius;
  
  sldSpeed.min = -10;
  sldSpeed.max = 10;
  sldSpeed.value = speed;
  sldSpeed.addEventListener('input', () => {
    app.polygon.rotationSpeed = parseInt(sldSpeed.value);
    lblSpeed.innerText = sldSpeed.value;
  });
  lblSpeed.innerText = speed;
  
  chkCircle.addEventListener('input', () => {
    app.polygon.isCircleEnabled = chkCircle.checked;
  });
  
  chkPolygram.addEventListener('input', () => {
    app.polygon.isPolygramEnabled = chkPolygram.checked;
  });
  
  app.resume();
});

