goog.provide('Shape');
goog.provide('flash.display.Shape');

goog.require('flash.display.DisplayObjectContainer');

/**
 * Adobe Sprite docs: http://bit.ly/9A0wD2
 *
 * @constructor
 */
flash.display.Shape = function() {

  DisplayObjectContainer.call(this);

  /**
   * The graphics object for vector drawing
   * @type {flash.display.Graphics}
   */
  this.graphics_;

}; /* </ flash.display.Shape > */
goog.inherits(flash.display.Shape, flash.display.DisplayObjectContainer);
//Shape -> DisplayObject -> EventDispatcher -> Object

flash.display.Shape.prototype.getGraphics = function() {
  return this.graphics_;
};

/**
 * Render the shape to string.
 *
 * @override
 * @return {string} String representation of Shape.
 */
flash.display.Shape.prototype.toString = function() {
  return 'Shape:{x:' + this.x + ', y:' + this.y +
         ', w:' + this.width + ', h:' + this.height +
         ', alhpa:' + this.alpha + '}';
};

beebe.magic.enhanceWithGettersAndSetters2(flash.display.Shape.prototype);

goog.exportSymbol('flash.display.Shape', flash.display.Shape);
goog.exportSymbol('Shape', flash.display.Shape);

