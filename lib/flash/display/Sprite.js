goog.provide('Sprite');
goog.provide('flash.display.Sprite');

goog.require('flash.display');
goog.require('flash.display.DisplayObjectContainer');
goog.require('flash.display.Graphics');

/**
 * Adobe Sprite docs: http://bit.ly/cALn3b
 *
 * @this flash.display.Sprite
 */
flash.display.Sprite = function() {

  DisplayObjectContainer.call(this);

  // Private Attributes
  this.buttonMode_;
  this.dropTarget_;
  this.graphics_ = new flash.display.Graphics();
  this.hitArea_;
  this.soundTransform_;
  this.useHandCursor_;

};
goog.inherits(flash.display.Sprite, DisplayObjectContainer);
//Sprite -> DisplayObjectContainer -> InteractiveObject ->
//DisplayObject -> EventDispatcher -> Object


flash.display.Sprite.prototype.setButtonMode = function(val) {
  this.buttonMode_ = val;
};
flash.display.Sprite.prototype.getButtonMode = function() {
  return this.buttonMode_;
};

flash.display.Sprite.prototype.setDropTarget = function(val) {
  this.dropTarget_ = val;
};
flash.display.Sprite.prototype.getDropTarget = function() {
  return this.dropTarget_;
};

flash.display.Sprite.prototype.getGraphics = function() {
  return this.graphics_;
};
flash.display.Sprite.prototype.setHitArea = function(val) {
  this.hitArea_ = val;
};
flash.display.Sprite.prototype.getHitArea = function() {
  return this.hitArea_;
};


flash.display.Sprite.prototype.setSoundTransform = function(val) {
  this.soundTransform_ = val;
};
flash.display.Sprite.prototype.getSoundTransform = function() {
  return this.soundTransform_;
};

flash.display.Sprite.prototype.setUseHandCursor = function(val) {
  this.useHandCursor_ = val;
};
flash.display.Sprite.prototype.getUseHandCursor = function() {
  return this.useHandCursor_;
};

/**
 * Allow the user to drag this instance.
 *
 * @param {boolean} lockCenter Lock to center of mouse position?
 * @param {flash.geom.Rectangle} bounds Value relative to the coordinates
 *   of the Sprite's parent that specify a constraint rectangle for the Sprite.
 */
flash.display.Sprite.prototype.startDrag = function(lockCenter, bounds) {

  var lockCenter_ = lockCenter || false;
  var bounds_ = bounds || null;

  // TODO: enable drag of this as mouse moves

};

/**
 * Lets the user drag the specified sprite on a touch-enabled device.
 *
 * @param {int} touchPointID An int to assign to the touch point.
 * @param {bool} lockCenter Lock movement to center of touch point?
 * @param {flash.goem.Rectangle} bounds Value relative to the coordinates of
 *   the Sprite's parent that specify a constraint rectangle for the Sprite.
 */
flash.display.Sprite.prototype.startTouchDrag = function(touchPointID,
                                                         lockCenter, bounds) {

  var touchPointID_ = touchPointID;
  var lockCenter_ = lockCenter || false;
  var bounds_ = bounds || null;

  // TODO: enable drag during a touch event

};

/**
 * Ends the startDrag method.
 */
flash.display.Sprite.prototype.stopDrag = function() {
  // TODO: stopDrag method
};

/**
 * End the startTouchDrag method.
 *
 * @param {int} touchPointID The int assigned during startTouchDrag.
 */
flash.display.Sprite.stopTouchDrag = function(touchPointID) {
  // TODO: stopTouchDrag method
};

/**
 * Render object to string.
 *
 * @return {string} String representation of Sprite.
 */
flash.display.Sprite.prototype.toString = function() {
  // return 'Sprite:{x:' + this.x + ', y:' + this.y + ', ' +
  //        this.displayListToString() + '}';
  return 'Sprite:{x:' + this.x + ', y:' + this.y + '}';
};

beebe.magic.enhanceWithGettersAndSetters2(flash.display.Sprite.prototype);

goog.exportSymbol('flash.display.Sprite', flash.display.Sprite);
goog.exportSymbol('Sprite', flash.display.Sprite);

