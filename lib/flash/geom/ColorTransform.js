goog.provide('ColorTransform');
goog.provide('flash.geom.ColorTransform');

goog.require('flash.geom');

/**
 * http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/ColorTransform.html
 *
 */
flash.geom.ColorTransform = ColorTransform = function(redMultiplier,
                                                      greenMultiplier,
                                                      blueMultiplier,
                                                      alphaMultiplier,
                                                      redOffset,
                                                      greenOffset,
                                                      blueOffset,
                                                      alphaOffset) {

  this.alphaMultiplier_ = beebe.math.limit((alphaMultiplier || 1), 0, 1);
  this.alphaOffset_ = beebe.math.limit((alphaOffset || 0), -255, 255);

  this.blueMultiplier_ = beebe.math.limit((blueMultiplier || 1), 0, 1);
  this.blueOffset_ = beebe.math.limit((blueOffset || 0), -255, 255);

  this.greenMultiplier_ = beebe.math.limit((greenMultiplier || 1), 0, 1);
  this.greenOffset_ = beebe.math.limit((greenOffset || 0), -255, 255);

  this.redMultiplier_ = beebe.math.limit((redMultiplier || 1), 0, 1);
  this.redOffset_ = beebe.math.limit((redOffset || 0), -255, 255);

  this.color_ = null;

};


ColorTransform.prototype.getRedMultiplier = function() {
  return this.redMultiplier_;
};

ColorTransform.prototype.getGreenMultiplier = function() {
  return this.greenMultiplier_;
};

ColorTransform.prototype.getBlueMultiplier = function() {
  return this.blueMultiplier_;
};

ColorTransform.prototype.getAlphaMultiplier = function() {
  return this.alphaMultiplier_;
};

ColorTransform.prototype.getRedOffset = function() {
  return this.redOffset_;
};

ColorTransform.prototype.getGreenOffset = function() {
  return this.greenOffset_;
};

ColorTransform.prototype.getBlueOffset = function() {
  return this.blueOffset_;
};

ColorTransform.prototype.getAlphaOffset = function() {
  return this.alphaOffset_;
};

ColorTransform.prototype.getColor = function() {
  return this.color_;
};


ColorTransform.prototype.setRedMultiplier = function(val) {
  this.redMultiplier_ = beebe.math.limit(val, 0, 1);
};

ColorTransform.prototype.setGreenMultiplier = function(val) {
  this.greenMultiplier_ = beebe.math.limit(val, 0, 1);
};

ColorTransform.prototype.setBlueMultiplier = function(val) {
  this.blueMultiplier_ = beebe.math.limit(val, 0, 1);
};

ColorTransform.prototype.setAlphaMultiplier = function(val) {
  this.alphaMultiplier_ = beebe.math.limit(val, 0, 1);
};

ColorTransform.prototype.setRedOffset = function(val) {
  this.redOffset_ = beebe.math.limit(val, -255, 255);
};

ColorTransform.prototype.setGreenOffset = function(val) {
  this.greenOffset_ = beebe.math.limit(val, -255, 255);
};

ColorTransform.prototype.setBlueOffset = function(val) {
  this.blueOffset_ = beebe.math.limit(val, -255, 255);
};

ColorTransform.prototype.setAlphaOffset = function(val) {
  this.alphaOffset_ = beebe.math.limit(val, -255, 255);
};

ColorTransform.prototype.setColor = function(val) {
  this.color_ = val;
};

ColorTransform.prototype.concat = function(second) {

  // TODO: Verify that it should be * for the multipliers and + for offsets

  var am = this.alphaMultiplier_ * second.getAlphaMultiplier();
  var ao = this.alphaOffset_ + second.getAlphaOffset();

  var bm = this.blueMultiplier_ * second.getBlueMultiplier();
  var bo = this.blueOffset_ + second.getBlueOffset();

  var gm = this.greenMultiplier_ * second.getGreenMultiplier();
  var go = this.greenOffset_ + second.getGreenOffset();

  var rm = this.redMultiplier_ * getRedMultiplier();
  var ro = this.redOffset_ + getRedOffset();

  return new ColorTransform(rm, gm, bm, am, ro, go, bo, ao);

};

ColorTransform.prototype.toString = function(second) {

  var s = '(';

  s += 'redMultiplier=' + this.redMultiplier_,
  s += ', greenMultiplier=' + this.greenMultiplier_,
  s += ', blueMultiplier=' + this.blueMultiplier_,
  s += ', alphaMultiplier=' + this.alphaMultiplier_,
  s += ', redOffset=' + this.redOffset_,
  s += ', greenOffset=' + this.greenOffset_,
  s += ', blueOffset=' + this.blueOffset_,
  s += ', alphaOffset=' + this.alphaOffset + ')';

  return s;

};

beebe.magic.enhanceWithGettersAndSetters2(ColorTransform.prototype);

goog.exportSymbol('flash.geom.ColorTransform', flash.geom.ColorTransform);
goog.exportSymbol('ColorTransform', ColorTransform);

