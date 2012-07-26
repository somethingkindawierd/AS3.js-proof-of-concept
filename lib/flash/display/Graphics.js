goog.provide('Graphics');
goog.provide('flash.display.Graphics');

goog.require('beebe');
goog.require('flash.display');
goog.require('flash.geom.Point');

/**
 * Adobe Docs flash.display.graphics: http://bit.ly/aUtxIB
 * @constructor
 */
flash.display.Graphics = function() {

  /**
   * The dom canvas element to draw into
   * @private
   * @type {object}
   */
  this.canvas_ = document.getElementById('stageCanvas');
  
  this.hasFill_ = false;
  
  this.hasLine_ = false;

  this.drawingPath_ = false;

	this.currentFillStyle_ = undefined;
	this.currentLineStyle_ = undefined;
	this.prevMoveTo_ = new Point();
	this.currentPosition_ = new Point();
};

flash.display.Graphics.prototype.getContext = function() {
  return this.canvas_.getContext('2d');
};

flash.display.Graphics.prototype.beginFill = function(color, alpha) {

  //trace('color:', color, 'alpha:', alpha);

  var c = this.getContext();
  
	c.beginPath();

	//alpha = alpha || 1;
	alpha = goog.math.clamp(alpha, 0, 1);

	this.currentFillStyle_ = {
		color: color,
		alpha: alpha
	};
	
  this.hasFill_ = true;

  // TODO: handle alpha on begin fill
  //c.globalAlpha = goog.math.clamp(alpha, 0, 1);

  color = beebe.color.getAsHexColorString(color);
	rgb = beebe.color.hex2rgb(color, alpha);

	trace('rgba', rgb);

  c.fillStyle = rgb;

};

flash.display.Graphics.prototype.lineStyle = function(thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {

  var c = this.getContext();
  
	alpha = goog.math.clamp(alpha, 0, 1);

	this.currentLineStyle_ = {
		thickness: thickness,
		color: color,
		alpha: alpha
	};

  this.hasLine_ = true;

  c.lineWidth = thickness;
  color = beebe.color.getAsHexColorString(color);
	rgb = beebe.color.hex2rgb(color, alpha);

	trace('rgba', rgb);

  c.strokeStyle = rgb; 

};

flash.display.Graphics.prototype.drawCircle = function(x, y, radius) {

  if(!this.hasFill_ && !this.hasLine_) {
    return;
  }

  var c = this.getContext();
	c.beginPath();
  c.arc(x, y, radius, 0, Math.PI*2);
	this.endFill(); // auto-invoke the endfill method.

};

flash.display.Graphics.prototype.drawRect = function(x, y, width, height) {

	if(!this.hasFill_ && !this.hasLine_) {
		return;
	}

	var c = this.getContext();
	//c.fillRect(x, y, width, height);
	c.rect(x, y, width, height);
	this.endFill(); // auto-invoke the endfill method.

};

flash.display.Graphics.prototype.moveTo = function(x, y) {
	var c = this.getContext(); 
	if(!this.drawingPath_) {
		this.drawingPath_ = true;
		c.beginPath();
	}
	this.currentPosition_ = new Point(x, y);
	this.prevMoveTo_ = new Point(x, y);
	c.moveTo(x, y);
};

flash.display.Graphics.prototype.lineTo = function(x, y) {
	var c = this.getContext();
	if(!this.drawingPath_) {
		this.drawingPath_ = true;
		c.beginPath();
	}
	this.currentPosition_ = new Point(x, y);
	c.lineTo(x, y);
};

flash.display.Graphics.prototype.endFill = function() {

  // TODO: endFill function body.

  var c = this.getContext();

	if(!this.currentPosition_.equals(this.prevMoveTo_)) {
		// TODO: close path...
		this.drawingPath_ = false;
		c.closePath();
	}

  if(this.hasFill_) {
    c.fill();
    this.hasFill_ = false;
  }
  if(this.hasLine_) {
    c.stroke();
  }
};
goog.exportSymbol('flash.display.Graphics', flash.display.Graphics);
goog.exportSymbol('Graphics', Graphics);

