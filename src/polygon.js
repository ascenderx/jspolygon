const CROSSHAIR_DIM = 5;

class Polygon {
  constructor(x, y, n, r, a) {
    this._position = [x, y];
    this._r = r;
    this._a = a;
    this._da = 0;
    this._points = this._generatePoints(
      this._position,
      n,
      r,
      this._a
    );
    this._wasModified = false;
    this._isDirty = true;
    
    this.isCircleEnabled = false;
    this.isPolygramEnabled = false;
  }
  
  _generatePoints(center, n, r, a) {
    let points = [];
    let dt = 360.0 / n;
    for (let k = 0; k < n; k++) {
      let point = [r, 0];
      rotate(
        point,
        center,
        dt * k + a
      );
      points.push(point);
    }
    return points;
  }
  
  get rotation() {
    return this._a;
  }
  
  set rotation(value) {
    this._a = value;
    this._isDirty = true;
    this._wasModified = true;
  }
  
  get rotationSpeed() {
    return this._da;
  }
  
  set rotationSpeed(value) {
    this._da = value;
    this._isDirty = true;
    this._wasModified = true;
  }
  
  get radius() {
    return this._r;
  }
  
  set radius(value) {
    this._r = value;
    this._isDirty = true;
    this._wasModified = true;
  }
  
  get x() {
    return this._position[0];
  }
  
  get y() {
    return this._position[1];
  }
  
  get length() {
    return this._points.length;
  }
  
  set length(value) {
    this._points = this._generatePoints(
      this._position,
      value,
      this._r,
      this._a
    );
    this._isDirty = true;
    this._wasModified = true;
  }
  
  _updatePoints() {
    let center = this._position;
    let n = this._points.length;
    let a = this._a;
    let r = this._r;
    let dt = 360.0 / n;
    for (let k = 0; k < n; k++) {
      let point = this._points[k];
      point[0] = r;
      point[1] = 0;
      rotate(
        point,
        center,
        (dt * k) + a
      );
    }
  }
  
  update() {
    this._a += this._da;
    if (this._wasModified || this._da !== 0) {
      this._updatePoints();
    }
  }
  
  draw(context) {
    if (this._isDirty) {
      let l = 1;
      context.lineWidth = l * 2;
      let d = CROSSHAIR_DIM + l;
      let cx = this._position[0];
      let cy = this._position[1];
      let n = this._points.length;
      let r = this._r;
      
      // Draw the center crosshair.
      context.fillStyle = '#f70';
      context.fillRect(
        cx - l,
        cy - d,
        l * 2,
        d * 2
      );
      context.fillRect(
        cx - d,
        cy - l,
        d * 2,
        l * 2
      );
      
      // Draw the circumscribing circle, if enabled.
      if (this.isCircleEnabled) {
        context.strokeStyle = '#0af';
        context.beginPath();
        context.arc(
          cx,
          cy,
          r,
          0,
          2 * Math.PI
        );
        context.stroke();
      }
      
      // Draw the inner polygram, if enabled.
      if (this.isPolygramEnabled && (n > 3)) {
        // Draw the default polygram (there will be at least one as long as
        // there are more than 3 sides.
        context.strokeStyle = '#0af';
        context.beginPath();
        let x0 = this._points[0][0];
        let y0 = this._points[0][1];
        context.moveTo(x0, y0);
        for (let k = 1; k < n; k++) {
          let index = (k * 2) % n;
          let xk = this._points[index][0];
          let yk = this._points[index][1];
          context.lineTo(xk, yk);
        }
        context.closePath();
        context.stroke();
        
        // Draw another one if the number of sides is even.
        if (n % 2 === 0) {
          context.strokeStyle = '#0af';
          context.beginPath();
          let x0 = this._points[1][0];
          let y0 = this._points[1][1];
          context.moveTo(x0, y0);
          for (let k = 1; k < n; k++) {
            let index = (k * 2 + 1) % n;
            let xk = this._points[index][0];
            let yk = this._points[index][1];
            context.lineTo(xk, yk);
          }
          context.closePath();
          context.stroke();
        }
      }
      
      // Draw the polygon.
      context.strokeStyle = '#f70';
      context.beginPath();
      let x0 = this._points[0][0];
      let y0 = this._points[0][1];
      context.moveTo(x0, y0);
      for (let k = 1; k < n; k++) {
        let xk = this._points[k][0];
        let yk = this._points[k][1];
        context.lineTo(xk, yk);
      }
      context.closePath();
      context.stroke();
    }
  }
}

