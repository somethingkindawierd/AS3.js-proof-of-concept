goog.provide('DisplayObjectContainer');
goog.provide('flash.display.DisplayObjectContainer');

goog.require('flash.display.InteractiveObject');
goog.require('flash.errors.ArgumentError');
goog.require('flash.errors.RangeError');
goog.require('flash.events.Event');
goog.require('goog.array');

/**
 * Adobe DisplayObjectContainer docs: http://bit.ly/9pIZHX
 *
 * @constructor
 */
flash.display.DisplayObjectContainer = DisplayObjectContainer = function() {

  InteractiveObject.call(this);

  // TODO: Create Display List manager tools...
  // we'll probably want more than a simple array cause we will be doing alot
  // or searching, rearranging of order and depth, and adding/removing.
  // Create a basic display list manager for making these operations easier.

  this.mouseChildren_ = true;
  this.tabChildren_ = true;
  this.textSnapshot_;
  this.displayList_ = [];

};
goog.inherits(DisplayObjectContainer, InteractiveObject);
// DisplayObjectContainer -> InteractiveObject -> DisplayObject ->
// EventDispatcher -> Object

/**
 * Getter for the `mouseChildren` property.
 * Determines whether or not the children of the object are mouse enabled.
 *
 * @return {boolean} True if children are moused, false otherwise.
 */
DisplayObjectContainer.prototype.getMouseChildren = function() {
  return this.mouseChildren_;
};

/**
 * Setter for the `mouseChildren` property.
 * Determines whether or not the children of the object are mouse enabled.
 *
 * @param {boolean} val Should children be moused?
 */
DisplayObjectContainer.prototype.setMouseChildren = function(val) {
  this.mouseChildren_ = val;
};

/**
 * Getter for `numChildren` property.
 *
 * @return {int} The number of children in the display list.
 */
DisplayObjectContainer.prototype.getNumChildren = function() {
  return beebe.array.compact(this.displayList_).length;
};

/**
 * Getter for `tabChildren` property.
 * Determines whether the children of the object are tab enabled.
 *
 * @return {boolean} True if children are tabbable, false otherwise.
 */
DisplayObjectContainer.prototype.getTabChildren = function() {
  return this.tabChildren_;
};

/**
 * Setter for `tabChildren` property.
 * Determines whether the children of the object are tab enabled.
 *
 * @param {boolean} val Are children tab-enabled?
 */
DisplayObjectContainer.prototype.setTabChildren = function(val) {
  this.tabChildren_ = val;
};

/**
 * Getter for `textSnapshot` property.
 *
 * @return {flash.text.TextSnapshot} A Text Snapshot.
 */
// DisplayObjectContainer.prototype.getTextSnapshot = function() {
//   return this.textSnapshot_;
// };

/**
 * Add a child to the display object stack.
 *
 * @this flash.display.DisplayObjectContainer
 *
 * @param {DisplayObject} child The display object to add.
 * @return {DisplayObject} The display object added to the stack.
 */
DisplayObjectContainer.prototype.addChild = function(child) {

  if (child === this) {
    // throw ArgumentError http://bit.ly/99tWLE
    throw new ArgumentError('You cannot add a Display Object to itself');
  }

  // Is this child part of another display list? remove it first!
  if (child.parent) {
    child.parent.removeChild(child);
  }

  // TODO: Display list management -- this will need to add the item to
  // the actual canvas and draw it...
  this.displayList_.push(child);
  child.addParent_(this);

  var e = new Event(Event.ADDED);
  e.target = this; // TODO; is event target this Display Object, or the child?
  this.dispatchEvent(e);

  return child;

};


/**
 * Add a child to the display object stack at index specified.
 *
 * @this flash.display.DisplayObjectContainer
 *
 * @param {DisplayObject} child The display object to add.
 * @param {int} index The index position where child will be added.
 * @return {DisplayObject} The display object added to the stack.
 */
DisplayObjectContainer.prototype.addChildAt = function(child, index) {

  // Is the index with allowable range?
  if (index < 0) {
    throw new RangeError('Index out of range.');
  }

  // Be sure the child is not the parent...
  if (child === this) {
    // throw ArgumentError http://bit.ly/99tWLE
    throw new flash.errors.ArgumentError('You cannot add an object to itself');
  }

  if (child instanceof DisplayObject) {

    if (child.parent) {
      child.parent.removeChild(child);
    }

    if (!this.displayList_[index]) {
      this.displayList_[index] = child;
    }
    else {
      this.displayList_.splice(index, 0, child);
    }

    child.addParent_(this);

    var e = new Event(Event.ADDED);
    e.target = child;
    this.dispatchEvent(e);

    return child;
  }

  // TODO: Throw range error for bad index position
  // TODO: Throw ArgumentError if child is parent

  return undefined; // TODO: what is appropriate return value on fail?

};

/**
 * Does this contain the given child object?
 *
 * @param {DisplayObject} child The child to test for.
 * @return {boolean} True if contains, false otherwise.
 */
DisplayObjectContainer.prototype.contains = function(child) {
  return goog.array.contains(this.displayList_, child);
};

/**
 * Remove the child from the display list.
 *
 * @param {DisplayObject} child The child to remove.
 * @return {DisplayObject} The child passed in.
 */
DisplayObjectContainer.prototype.removeChild = function(child) {

  // Remove the child from the display list
  if (!goog.array.remove(this.displayList_, child)) {
    throw new ArgumentError('Child not found in display list');
  }

  // Remove the parent reference on the child.
  child.removeParent_();

  return child;

};

/**
 * Remove the child at specified index.
 *
 * @param {int} index The index of child to remove.
 * @return {DisplayObject} The child removed.
 */
DisplayObjectContainer.prototype.removeChildAt = function(index) {

  var child = this.getChildAt(index);
  this.removeChild(child);
  return child;

  // We could also do it this way, but we still need to manually
  // retrieve the child prior to removing it so we can return it.
  if (!goog.array.removeAt(this.displayList_, index)) {
    throw new RangeError('No child at specified index');
  }

};

/**
 * Get child by name.
 *
 * @param {string} name The name of the child to select.
 * @return {DisplayObject} The found child.
 */
DisplayObjectContainer.prototype.getChildByName = function(name) {

  var found = undefined;

  goog.array.find(this.displayList_,
    function(child, index) {
      if (child.name == name) {
        found = child;
        return true;
      }
      return false;
    }
  );

  return found;

};

/**
 * Render the object to a string.
 * @return {string} String representation of object.
 */
DisplayObjectContainer.prototype.toString = function() {
  return 'DisplayObject:{x:' + this.x + ', y:' + this.y + '}';
};

/**
 * Get the DisplayObject at the given index.
 *
 * @param {int} index The index position of child.
 * @return {DisplayObject} The child at specfied index.
 */
DisplayObjectContainer.prototype.getChildAt = function(index) {

  if (this.displayList_[index]) {
    return this.displayList_[index];
  }
  throw new RangeError('No child exists at index ' + index);

};

/**
 * Get the  index of given child.
 *
 * @param {DisplayObject} compare The DisplayObject to compare against.
 * @return {int} The index of the found child.
 */
DisplayObjectContainer.prototype.getChildIndex = function(compare) {

  var i = -1;

  goog.array.find(this.displayList_,
    function(child, index) {
      if (child === compare) {
        i = index;
        return true;
      }
      return false;
    }
  );

  if (i > -1) {
    return i;
  }
  else {
    throw new ArgumentError('The child is not part of this display list');
  }

};

/**
 * Returns an array of objects that lie under the specified point and are
 * children (or grandchildren, and so on) of this
 * DisplayObjectContainer instance.
 *
 * @param {Point} point The point to test.
 * @return {array} The array of found items.
 */
DisplayObjectContainer.prototype.getObjectsUnderPoint = function(point) {

  // TODO: after we have hit-test method of DisplayObjects, finish this method.

  return [];
};

/**
 * Set the index of the given child.
 * Will re-arrange display list if child already
 * exists at the specified location.
 *
 * @param {DisplayObject} child The child to move.
 * @param {int} index The new index of child.
 */
DisplayObjectContainer.prototype.setChildIndex = function(child, index) {

  if (!goog.array.contains(this.displayList_, child)) {
    throw new ArgumentError('Child is not child of this object');
  }

  // TODO: throw a RangeError when index out-of-range.

  this.removeChild(child);
  goog.array.insertAt(this.displayList_, child, index);

};

/**
 * Swap the depths of two children at specified indices.
 *
 * @param {int} indexA Index of child to swap.
 * @param {int} indexB Index of child to swap.
 */
DisplayObjectContainer.prototype.swapChildrenAt = function(indexA, indexB) {

  var childA = this.getChildAt(indexA);
  this.displayList_[indexA] = this.getChildAt(indexB);
  this.displayList_[indexB] = childA;

};

/**
 * Swap the depths of two children specified.
 *
 * @param {DisplayObject} a A child object to swap.
 * @param {DisplayObject} b A child object to swap.
 */
DisplayObjectContainer.prototype.swapChildren = function(a, b) {

  indexA = this.getChildIndex(a);
  indexB = this.getChildIndex(b);

  this.swapChildrenAt(indexA, indexB);

};

/**
 * Debug method to render the display list to a string.
 * @return {string} String representation of display list array.
 */
DisplayObjectContainer.prototype.displayListToString = function() {

  var i = 0, s = 'displayList:[', len = this.displayList_.length;

  for (i; i < len; i++) {
    if (this.displayList_[i]) {
      s += this.displayList_[i].toString();
      if (i < len - 1) {
        s += ', ';
      }
    }
  }

  s += ']';

  return s;

};

beebe.magic.enhanceWithGettersAndSetters2(DisplayObjectContainer.prototype);

/*
 * DisplayObjectContainer.prototype.toString = function() {
 *
 * var i = 0, s = 'DisplayObject.displayList:[', len = displayList_.length;
 *
 * for(i; i < len; i++) { if(this[i]) { s += displayList_[i].toString(); if(i <
 * len-1) { s += ', '; } } }
 *
 * s += ']';
 *
 * return s;
 *  }
 */

goog.exportSymbol('flash.display.DisplayObjectContainer',
                  flash.display.DisplayObjectContainer);
goog.exportSymbol('DisplayObjectContainer', DisplayObjectContainer);

