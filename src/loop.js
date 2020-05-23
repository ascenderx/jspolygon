class Loop {
  constructor(callback, interval) {
    this._callback = callback;
    this._interval = interval;
    this._previous = 0;
    this._handle = null;
  }
  
  _update() {
    this._handle = requestAnimationFrame(this._tick.bind(this));
  }
  
  _cancel() {
    cancelAnimationFrame(this._handle);
    this._handle = null;
    this._previous = 0;
  }
  
  _tick(timestamp) {
    let elapsed = timestamp - this._previous;
    if (elapsed >= this._interval) {
      this._previous = timestamp;
      this._callback();
    }
    this._update();
  }
  
  get isRunning() {
    return this._handle !== null;
  }
  
  resume() {
    if (this._handle !== null) {
      return;
    }
    this._update();
  }
  
  pause() {
    if (this._handle === null) {
      return;
    }
    this._cancel();
  }
}

