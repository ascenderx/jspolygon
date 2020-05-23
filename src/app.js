class Application {
  constructor(canvas, numSides, radius, rotation) {
    this._cvs = canvas;
    this._ctx = canvas.getContext('2d');
    this.polygon = new Polygon(
      canvas.width * 0.5,
      canvas.height * 0.5,
      numSides || 5,
      radius || 50,
      rotation || 0,
    );
    this._loop = new Loop(() => {
      this._update();
      this._draw();
    }, 50);
  }
  
  resume() {
    this._loop.resume();
  }
  
  pause() {
    this._loop.resume();
  }
  
  _update() {
    this.polygon.update();
  }
  
  _draw() {
    // Draw the background.
    this._ctx.clearRect(
      0,
      0,
      this._cvs.width,
      this._cvs.height
    );
    
    this.polygon.draw(this._ctx);
  }
}

