goog.provide('flash.display.DisplayObject');
goog.provide('DisplayObject');

goog.require('flash.events.EventDispatcher');
goog.require('flash.geom.Transform');

/**
 * Adobe DisplayObject docs: http://bit.ly/bBDEHa
 * @constructor
 */
flash.display.DisplayObject = function() {

  flash.events.EventDispatcher.call(this);

  //----------------------------------------------------------------------------
  // < Private Properties >                                                    -
  //----------------------------------------------------------------------------

  // This is a list of all properties except those related to 3D.
  this.alpha_ = 1;
  this.blendMode_;
  this.blendShader_;
  this.cacheAsBitmap_;
  this.filters_ = [];
  this.height_ = 0;
  this.loaderInfo_;
  this.mask_; // a DisplayObject used to mask this instance.
  this.mouseX_;
  this.mouseY_;
  this.name_
  this.opaqueBackground_;
  this.parent_; // DisplayObjectContainer that contains this DisplayObject
  this.stage_; // Will this be the canvas element?
  this.root_;
  this.rotation_ = 0;
  this.scaleX_ = 100; // scale as a %
  this.scaleY_ = 100; // scale as a %
  this.scrollRect_; // TODO: set default scroll rect
  this.transform_ = new flash.geom.Transform();
  this.visible_ = 1;
  this.width_ = 0;
  this.x_ = 0;
  this.y_ = 0;

};
goog.inherits(flash.display.DisplayObject, flash.events.EventDispatcher);




//------------------------------------------------------------------------------
// < Getters n Setters >                                                       -
//------------------------------------------------------------------------------

// Define our getters and setters
flash.display.DisplayObject.prototype.getX = function() {
  return this.x_;
};
flash.display.DisplayObject.prototype.setX = function(val) {
  this.x_ = val;
};

flash.display.DisplayObject.prototype.getY = function() {
  return this.y_;
};
flash.display.DisplayObject.prototype.setY = function(val) {
  this.y_ = val;
};

flash.display.DisplayObject.prototype.getHeight = function() {
  return this.height_;
};
flash.display.DisplayObject.prototype.setHeight = function(val) {
  this.height_ = val;
};

flash.display.DisplayObject.prototype.getWidth = function() {
  return this.width_;
};
flash.display.DisplayObject.prototype.setWidth = function(val) {
  this.width_ = val;
};

flash.display.DisplayObject.prototype.getAlpha = function() {
  return this.alpha_;
};
flash.display.DisplayObject.prototype.setAlpha = function(val) {
  this.alpha_ = val;
  // TODO: Update the transform.colorTransform.alphaMultiplier value
};

flash.display.DisplayObject.prototype.getName = function() {
  return this.name_;
};
flash.display.DisplayObject.prototype.setName = function(val) {
  this.name_ = val;
};

flash.display.DisplayObject.prototype.getRotation = function() {
  return this.rotation_;
};
flash.display.DisplayObject.prototype.setRotation = function(val) {
  this.rotation_ = val;
};

flash.display.DisplayObject.prototype.getTransform = function() {
  return this.transform_;
};
flash.display.DisplayObject.prototype.setTransform = function(val) {
  this.transform__ = val;
};

flash.display.DisplayObject.prototype.getParent = function() {
  return this.parent_;
};

flash.display.DisplayObject.prototype.getStage = function() {
  return this.stage_;
};

//------------------------------------------------------------------------------
//</ Getters n Setters >                                                       -
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//< Private Methods >                                                          -
//------------------------------------------------------------------------------

/**
 * Set the parent. Used only by the parent when the parent adds
 * this DisplayObject to the display list.
 *
 * @private
 * @param {DisplayObjectContainer} p The parent owning the display list.
 */
flash.display.DisplayObject.prototype.addParent_ = function(p) {
  this.parent_ = p;
};

/**
 * Remove the parent. Used only by the parent when parent removes
 * this DisplayObject from the display list.
 *
 * @private
 */
flash.display.DisplayObject.prototype.removeParent_ = function() {
  this.parent_ = null;
};

//------------------------------------------------------------------------------
//</ Private Methods >                                                         -
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// < Public Methods >                                                          -
//------------------------------------------------------------------------------

// getBounds(targetCoordinateSpace:DisplayObject):Rectangle
flash.display.DisplayObject.prototype.getBounds = function(targetCoordinateSpace) {

  // TODO: Return a rectangle

};

// getRect(targetCoordinateSpace:DisplayObject):Rectangle
flash.display.DisplayObject.prototype.getRect = function(targetCoordinateSpace) {

  // TODO: Return a rectangle

};

// globalToLocal(point:Point):Point
flash.display.DisplayObject.prototype.globalToLocal = function(point) {

  // TODO: convert point

};

// hitTestObject(obj:DisplayObject):Boolean
flash.display.DisplayObject.prototype.hitTestObject = function(obj) {

  // TODO: hit test function body

};

// hitTestPoint(x:Number, y:Number, shapeFlag:Boolean = false):Boolean
flash.display.DisplayObject.prototype.hitTestPoint = function(x, y, shapeFlag) {

  // TODO: hit test function body

};

// localToGlobal(point:Point):Point
flash.display.DisplayObject.prototype.localToGlobal = function(point) {

  // TODO: convert point

};

beebe.magic.enhanceWithGettersAndSetters2(flash.display.DisplayObject.prototype);

//------------------------------------------------------------------------------
// </ Public Methods >                                                         -
//------------------------------------------------------------------------------

goog.exportSymbol('flash.display.DisplayObject', flash.display.DisplayObject);
goog.exportSymbol('DisplayObject', flash.display.DisplayObject);

