goog.provide('flash.geom.Matrix');
goog.provide('Matrix');

goog.require('flash.geom');

/**
 * http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html
 *
 * A great resource: http://www.senocular.com/flash/tutorials/transformmatrix/
 *
 * (a:Number = 1, b:Number = 0, c:Number = 0, d:Number = 1, tx:Number = 0, ty:Number = 0)
 *
 * @param int a
 * @param int b
 * @param int c
 * @param int d
 * @param int tx
 * @param int ty
 */

flash.geom.Matrix = function(a, b, c, d, tx, ty){


  /**
   * @var int a The value that affects the positioning of pixels along the x
   * axis when scaling or rotating an image.
   */
  this.a_ = a || 1;


  /**
   * @var int b The value that affects the positioning of pixels
   * along the y axis when rotating or skewing an image.
   */
  this.b_ = b || 0;


  /**
   * @var int c The value that affects the positioning of pixels
   * along the x axis when rotating or skewing an image.
   */
  this.c_ = c || 0;

  /**
   * @var int d The value that affects the positioning of
   * pixels along the x axis when scaling or rotating an image.
   */
  this.d_ = d || 1;

  /**
   * @var int tx The distance by which to translate each point
   * long the x axis.
   */
  this.tx_ = tx || 0;

  /**
   * @var int ty The distance by which to translate each point
   * along the y axis.
   */
  this.ty_ = ty || 0;

};

// Define our getters and setters
flash.geom.Matrix.prototype.getA = function() {
  return this.a_;
};
flash.geom.Matrix.prototype.setA = function(val) {
  this.a_ = val;
};

flash.geom.Matrix.prototype.getB = function() {
  return this.b_;
};
flash.geom.Matrix.prototype.setB = function(val) {
  this.b_ = val;
};

flash.geom.Matrix.prototype.getC = function() {
  return this.c_;
};
flash.geom.Matrix.prototype.setC = function(val) {
  this.c_ = val;
};

flash.geom.Matrix.prototype.getD = function() {
  return this.d_;
};
flash.geom.Matrix.prototype.setD = function(val) {
  this.d_ = val;
};

flash.geom.Matrix.prototype.gettx = function() {
  return this.tx_;
};
flash.geom.Matrix.prototype.settx = function(val) {
  this.tx_ = val;
};

flash.geom.Matrix.prototype.getty = function() {
  return this.ty_;
};

flash.geom.Matrix.prototype.setty = function(val) {
  this.ty_ = val;
};

/**
 * @return {Matrix} A clone of this Matrix.
 */
flash.geom.Matrix.prototype.clone = function(){

  return new flash.geom.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);

};

/**
 * Concatenates a matrix with the current matrix, effectively combining the
 * geometric effects of the two.
 *
 * http://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#concat()}
 *
 * @param {Matrix} m The matrix to contat with this matrix.
 *
 * @return void
 */
flash.geom.Matrix.prototype.concat = function(m) {

  var r = new flash.geom.Matrix();

  // 1,1
  // (a,c,tx) * (a,b,0)
  r.a = (this.a * m.a) + (this.c * m.b);

  // 1,2
  // (a,c,tx) * (c,d,0)
  r.c = (this.a * m.c) + (this.c * m.d);

  // 1,3
  // (a,c,tx) * (tx,ty,1)
  r.tx = (this.a * m.tx) + (this.c * m.ty) + this.tx;

  // 2,1
  // (b,d,ty) * (a,b,0)
  r.b = (this.b * m.a) + (this.d * m.b);

  // 2,2
  //(b,d,ty) * (c,d,0)
  r.d = (this.b * m.c) + (this.d * m.d);

  // 2,3
  // (b,d,ty) * (tx,ty,1);
  r.ty = (this.b * m.tx) + (this.d * m.ty) + this.ty;

  this.a = r.a;
  this.b = r.b;
  this.c = r.c;
  this.d = r.d;
  this.tx = r.tx;
  this.ty = r.ty;

};

/**
 * Includes parameters for scaling, rotation, and translation.
 * createBox(scaleX:Number, scaleY:Number, rotation:Number = 0, tx:Number = 0,
 * ty:Number = 0):void
 *
 * @param float scaleX
 * @param float scaleY
 * @param float rotation
 * @param float tx
 * @param float ty
 *
 * @return void
 */
flash.geom.Matrix.prototype.createBox = function(scaleX, scaleY, rotation,
                                                 tx, ty){

	this.identity();
	this.rotate(rotation);
	this.scale(scaleX, scaleY);
	this.translate(tx, ty);

};

/**
 * Creates the specific style of matrix expected by the beginGradientFill() and
 * lineGradientStyle() methods of the Graphics class.
 * createGradientBox(width:Number, height:Number, rotation:Number = 0, tx:Number =
 * 0, ty:Number = 0):void
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#createGradientBox()}
 *
 * @param float width
 * @param float height
 * @param float rotation
 * @param float tx
 * @param float ty
 *
 * @return void
 */
flash.geom.Matrix.prototype.createGradientBox = function(width, height,
                                                         rotation, tx, ty){

	// does the graphics class have to be finished first?  thinking yes.

};

/**
 * Given a point in the pretransform coordinate space, returns the coordinates
 * of that point after the transformation occurs.
 * deltaTransformPoint(point:Point):Point
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#deltaTransformPoint()}
 *
 * @param {Point} point
 *
 * @return {Point}
 */
flash.geom.Matrix.prototype.deltaTransformPoint = function(point){

  var point = {
	  x : ( (this.a * point.x) +
            (this.c * point.y) ),
      y : ( (this.b * point.x) +
			(this.d * point.y) )
	};

  return new Point(point.x, point.y);


};

/**
 * Sets each matrix property to a value that causes a null transformation.
 * identity():void
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#identity()}
 *
 * @return void
 */
flash.geom.Matrix.prototype.identity = function(){

  // 1 0 0
  // 0 1 0
  // 0 0 1

  this.a = 1;
  this.b = 0;
  this.c = 0;
  this.d = 1;
  this.tx = 0;
  this.ty = 0;

};


/**
 * Performs the opposite transformation of the original matrix. invert():void
 *
 * Math below taken straight from Wikipedia:
 * http://en.wikipedia.org/wiki/Matrix_inversion#Methods_of_matrix_inversion
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#invert()}
 *
 * @return void
 */
flash.geom.Matrix.prototype.invert = function(){
  // AA-1 = A-1A = I
  // Flash Matrix -> Wikipedia Matrix -> Inverted Matrix
  // a c tx       -> a b c            -> A D G
  // b d ty       -> d e f            -> B E H
  // 0 0 1        -> g h k            -> C F K

  // Notice we do not need F or K
  // C is necessary to test for invertability
  var A = (this.d * 1) - (this.ty * 0),
      B = (this.ty * 0) - (1 * this.b),
      C = (this.b * 0) - (this.d_ * 0),
      D = (this.tx * 0) - (this.c * 1),
      E = (this.a * 1) - (this.tx * 0),
      G = (this.c * this.ty) - (this.tx * this.d),
      H = (this.tx * this.b) - (this.a * this.ty);

  // Z = a(ek − fh) + b(fg − kd) + c(dh − eg)
  // Test to see if this Matrix is invertable
  if(((this.a * A) + (this.c * B) + (this.tx * C)) <= 0) { // not invertable
    return null;
  }

  return new flash.geom.Matrix(A, B, D, E, G, H);

};

/**
 * Applies a rotation transformation to the Matrix object.
 * rotate(angle:Number):void
 *
 * http://en.wikipedia.org/wiki/Rotation_matrix
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#rotate()}
 *
 * @return void
 *
 */
flash.geom.Matrix.prototype.rotate = function(r){

  var m = new flash.geom.Matrix(Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0);
  this.concat(m);

};

/**
 * Applies a scaling transformation to the matrix. scale(sx:Number,
 * sy:Number):void
 *
 * @link http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#scale()}
 *
 * @param float sx
 * @param float sy
 *
 * @return void
 *
 */
flash.geom.Matrix.prototype.scale = function(sx, sy){

  var m = new flash.geom.Matrix(sx, 0, 0, sy, 0, 0);
  this.concat(m);

};

/**
 * Returns a text value listing the properties of the Matrix object.
 * toString():String
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#toString()}
 *
 * @return string
 *
 * TODO: need to test this override...see if it works.
 */
flash.geom.Matrix.prototype.toString = function(){

  return this.a + ' ' + this.c + ' ' + this.tx + '\n' +
         this.b + ' ' + this.d + ' ' + this.ty;

};


/**
 * Returns the result of applying the geometric transformation represented by
 * the Matrix object to the specified point. transformPoint(point:Point):Point
 *
 * Converts a local point to a world (matrix) point.
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#transformPoint()}
 *
 * @param {Point} point
 *
 * @return {Point}
 *
 */
flash.geom.Matrix.prototype.transformPoint = function(point){

  // WARNING: DOUBLE CHECK MATH!!  been awhile since knocking these out
  // in my linear algebra class
  var point = {
	  x : ( (this.a * point.x) +
          (this.c * point.y) +
          (this.tx) ),
    y : ( (this.b * point.x) +
			    (this.d * point.y) +
			    (this.ty) )
	};

  return new Point(point.x, point.y);

};

/**
 * Translates the matrix along the x and y axes, as specified by the dx and dy
 * parameters. translate(dx:Number, dy:Number):void
 *
 * @link {http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Matrix.html#translate()}
 *
 * @param {float} dx X coordinate.
 * @param {float} dy Y coordinate.
 *
 */
flash.geom.Matrix.prototype.translate = function(dx, dy) {

  this.tx += dx;
  this.ty += dy;

};

beebe.magic.enhanceWithGettersAndSetters2(flash.geom.Matrix.prototype);

goog.exportSymbol('flash.geom.Matrix', flash.geom.Matrix);
goog.exportSymbol('Matrix', flash.geom.Matrix);

