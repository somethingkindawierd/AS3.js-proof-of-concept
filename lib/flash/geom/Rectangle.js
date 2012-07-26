goog.provide('flash.geom.Rectangle');
goog.provide('Rectangle');

goog.require('flash.geom');
goog.require('flash.geom.Point');

/**
 * Adobe flash.geom documentation http://bit.ly/b2RieL
 * Using rectangles: http://bit.ly/cdgFee
 *
 * @author somethingkindawierd@gmail.com (Jon Beebe)
 *
 * @constructor
 * @param {number} x Origin on x axis.
 * @param {number} y Origin on y axis.
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 */
flash.geom.Rectangle = Rectangle = function(x, y, width, height) {

  this.x_ = x || 0;
  this.y_ = y || 0;
  this.w_ = width || 0;
  this.h_ = height || 0;
  this.tl_ = new Point(0, 0);
  this.t_ = 0;
  this.r_ = 0;
  this.b_ = 0;
  this.l_ = 0;
  this.br_ = new Point(0, 0);
  this.size_ = new Point(0, 0);
  this.update_ = true;
  this.refresh();

};

Rectangle.prototype.setX = function(val) {
  this.x_ = val;
  this.refresh();
};

Rectangle.prototype.setY = function(val) {
  this.y_ = val;
  this.refresh();
};

Rectangle.prototype.setHeight = function(val) {
  this.h_ = val;
  this.refresh();
};

Rectangle.prototype.setWidth = function(val) {
  this.w_ = val;
  this.refresh();
};

Rectangle.prototype.setTop = function(val) {
  var diff = val - this.t_;
  this.y_ = this.y_ + diff;
  this.h_ = this.h_ - diff;
  this.refresh();
};

Rectangle.prototype.setBottom = function(val) {
  var diff = val - this.b_;
  this.h_ = this.h_ + diff;
  this.refresh();
};

Rectangle.prototype.setleft = function(val) {
  var diff = val - this.x_;
  this.x_ = this.x_ + diff;
  this.w_ = this.w_ - diff;
  this.refresh();
};

Rectangle.prototype.setright = function(val) {
  var diff = val - this.r_;
  this.w_ = this.w_ + diff;
  this.refresh();
};

Rectangle.prototype.settopLeft = function(pt) {
  this.update_ = false;
  this.left = pt.x;
  this.update_ = true;
  this.top = pt.y;
};

Rectangle.prototype.setbottomRight = function(pt) {
  this.update_ = false;
  this.right = pt.x;
  this.update_ = true;
  this.bottom = pt.y;
};

//-----------------------------------------------------------------
// </ Setters >
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// < Getters >
//-----------------------------------------------------------------

Rectangle.prototype.getX = function() {
  return this.x_;
};

Rectangle.prototype.getY = function() {
  return this.y_;
};

Rectangle.prototype.getWidth = function() {
  return this.w_;
};

Rectangle.prototype.getHeight = function() {
  return this.h_;
};

Rectangle.prototype.getTopLeft = function() {
  return this.tl_;
};

Rectangle.prototype.getTop = function() {
  return this.t_;
};

Rectangle.prototype.getRight = function() {
  return this.r_;
};

Rectangle.prototype.getBottom = function() {
  return this.b_;
};

Rectangle.prototype.getLeft = function() {
  return this.l_;
};

Rectangle.prototype.getBottomRight = function() {
  return this.br_;
};

Rectangle.prototype.getSize = function() {
  return this.size_;
};

//-----------------------------------------------------------------
// </ Getters >
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// < Public Methods >
//-----------------------------------------------------------------

Rectangle.prototype.clone = function() {
  return new Rectangle(this.x_, this.y_, this.w_, this.h_);
};

// contains(x:Number, y:Number):Boolean
Rectangle.prototype.contains = function(x, y) {
  // Remember that y=0 on the top/left corner,
  // not the bottom/left corner
  //console.log('x = ' + x + ', this.x_ = ' +
  //            this.x_ + ', this.r_ = ' + this.r_);
  //console.log('y = ' + y + ', this.y_ = ' +
  //            this.y_ + ', this.b_ = ' + this.b_);

  return (x > this.x_) && (x < this.r_) && (y < this.y_) && (y > this.b_);
};

// containsPoint(point:Point):Boolean
Rectangle.prototype.containsPoint = function(point) {
  return this.contains(point.x, point.y);
};

// containsRect(rect:Rectangle):Boolean
Rectangle.prototype.containsRect = function(rect) {
  return this.contains(rect.left, rect.top) &&
         this.contains(rect.right, rect.top) &&
         this.contains(rect.right, rect.bottom) &&
         this.contains(rect.left, rect.bottom);
};

// public function union(toUnion:Rectangle):Rectangle
Rectangle.prototype.union = function(toUnion) {

  var x, y, width, height;

  x = (this.x_ < toUnion.x) ? this.x_ : toUnion.x;
  y = (this.y_ > toUnion.y) ? this.y_ : toUnion.y;
  r = (this.r_ > toUnion.right) ? this.r_ : toUnion.right;
  b = (this.b_ < toUnion.bottom) ? this.b_ : toUnion.bottom;

  width = r - x;
  height = b - y;

  return new Rectangle(x, y, width, height);

};

Rectangle.prototype.intersects = function(r) {

  return containsPoint(r.topLeft) ||
         containsPoint(r.bottomLeft) ||
         contains(r.left, r.bottom) ||
         contains(r.top, r.right);

};

// public function intersection(toIntersect:Rectangle):Rectangle
Rectangle.prototype.intersection = function(r) {

  var x = 0, y = 0, width = 0, height = 0;

  if (intersects(r)) {

    x = (this.x_ > r.x) ? this.x_ : r.x;
    y = (this.y_ < r.y) ? this.y_ : r.y;
    r = (this.r_ < r.right) ? this.r_ : r.right;
    b = (this.b_ > r.bottom) ? this.b_ : r.bottom;

    width = r - x;
    height = b - y;

  }

  return new Rectangle(x, y, width, height);

};

Rectangle.prototype.isEmpty = function() {
  return (this.w_ > 0) && (this.h_ > 0);
};

// inflate(dx:Number, dy:Number):void
Rectangle.prototype.inflate = function(dx, dy) {

  // These equations came straight from AS3 docs
  this.x_ = this.x_ - dx;
  this.w_ = this.w_ + (2 * dx);
  this.y_ = this.y_ - dy;
  this.h_ = this.h_ + (2 * dy);

  this.refresh();

};

Rectangle.prototype.inflatePoint = function(point) {

  inflate(point.x, point.y);

};

Rectangle.prototype.offset = function(dx, dy) {

  this.x_ = this.x_ + dx;
  this.y_ = this.y_ + dy;

  this.refresh();

};

Rectangle.prototype.offsetPoint = function(pt) {
  this.offset(pt.x, pt.y);
};

Rectangle.prototype.setEmpty = function() {
  this.x_ = this.y_ = this.w_ = this.h_ = 0;
  this.refresh();
};

/**
* equals(toCompare:Rectangle):Boolean
 *
 * @param {Rectangle} r Rectangle to compare to.
 *
 * @return {bool} true if match, false otherwise.
 */
Rectangle.prototype.equals = function(r) {
  return (r.x === this.x_) && (r.y === this.y_) &&
         (r.width === this.w_) && (r.height === this.h_);
};

Rectangle.prototype.toString = function() {
  var s = '{x:' + this.x_ + ', y:' + this.y_;
  s += ', width:' + this.w_ + ', height:' + this.h_ + '}';
  return s;
};

//-----------------------------------------------------------------
// </ Public Methods >
//-----------------------------------------------------------------

Rectangle.prototype.refresh = function() {
  if (this.update_) {
    this.tl_ = new Point(this.x_, this.y_);
    this.t_ = this.tl_.y;
    this.r_ = this.x_ + this.w_;
    this.b_ = this.y_ + this.h_;
    this.l_ = this.tl_.x;
    this.br_ = new Point(this.r_, this.b_);
    this.size_ = new Point(this.w_, this.h_);
  }
}; /* </ refresh > */

beebe.magic.enhanceWithGettersAndSetters2(Rectangle.prototype);

goog.exportSymbol('flash.geom.Rectangle', flash.geom.Rectangle);
goog.exportSymbol('Rectangle', flash.geom.Rectangle);

