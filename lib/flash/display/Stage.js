goog.provide('flash.display.Stage');
goog.provide('Stage');

goog.require('flash.display.DisplayObjectContainer');
goog.require('flash.events.Event');

/**
 * Adobe Stage docs: http://bit.ly/chYY6X
 *
 * @constructor
 *
 * TODO: Flesh out the Stage class
 * TODO: init/create Stage as canvas element
 * TODO: Stage events
 * TODO: Enforce settings on inherited values that are inaplicable (see docs)
 *
 * @param {canvas} canvas The canvas element serving as the Stage.
 */
flash.display.Stage = Stage = function(canvas) {

  DisplayObjectContainer.call(this);

  this.align_;
  this.displayState_;
  this.focus_;
  this.frameRate_;
  this.fullScreenHeight_;
  this.fullScreenSourceRect_;
  this.fullScreenWidth_;
  this.height_;
  this.mouseChildren_ = true;
  this.quality_;
  this.scaleMode_;
  this.showDefaultContextMenu_;
  this.stageFocusRect_;
  this.stageHeight_;
  this.stageWidth_;
  this.tabChildren_ = true;
  this.textSnapshot_;
  this.width_;
  this.canvas_;

  /**
   * For event handling
   * @private
   */
  this.privateStore_ = {};
  this.privateStore_.listeners = [];


  this.canvas_ = document.getElementById(canvas);
  this.width_ = this.canvas_.width;
  this.height_ = this.canvas_.height;
  //console.log(this.canvas_);

};
goog.inherits(Stage, DisplayObjectContainer);
//Stage.inherits(DisplayObjectContainer);
//Stage -> DisplayObjectContainer -> InteractiveObject ->
//       DisplayObject -> EventDispatcher -> Object


Stage.prototype.getAlign = function() {
  return this.align_;
};
Stage.prototype.setAlign = function(val) {
  this.align_ = val;
};

Stage.prototype.getDisplayState = function() {
  return this.displayState_;
};
Stage.prototype.setDisplayState = function(val) {
  this.displayState_ = val;
};

Stage.prototype.getFocus = function() {
  return this.focus_;
};
Stage.prototype.setFocus = function(val) {
  this.focus_ = val;
};

Stage.prototype.getFrameRate = function() {
  return this.frameRate_;
};
Stage.prototype.setFrameRate = function(val) {
  // Set the focus to an InteractiveObject
  this.frameRate_ = val;
};

  Stage.prototype.getFullScreenHeight = function() {
  return this.fullScreenHeight_;
};

Stage.prototype.getFullScreenSourceRect = function() {
  return this.fullScreenSourceRect_;
};
Stage.prototype.setFullScreenSourceRect = function(val) {
  this.fullScreenSourceRect_ = val;
};

Stage.prototype.getFullScreenWidth = function() {
  return this.fullScreenWidth_;
};

Stage.prototype.getHeight = function() {
  return this.height_;
};
Stage.prototype.setHeight = function(val) {
  this.canvas_.height = val;
  this.height_ = val;
};

Stage.prototype.getMouseChildren = function() {
  return this.mouseChildren_;
},
Stage.prototype.setMouseChildren = function(val) {
  this.mouseChildren_ = val;
};

Stage.prototype.getNumChildren = function() {
//  return _(this.displayList_).chain().compact().size().value();
  return beebe.array.compact(this.displayList_).length;
};

Stage.prototype.getQuality = function() {
  return this.quality_;
};
Stage.prototype.setQuality = function(val) {
  this.quality_ = val;
};

Stage.prototype.getScaleMode = function() {
  return this.scaleMode_;
};
Stage.prototype.setScaleMode = function(val) {
  this.scaleMode_ = val;
};

Stage.prototype.getShowDefaultContextMenu = function() {
  return this.showDefaultContextMenu_;
};
Stage.prototype.setShowDefaultContextMenu = function(val) {
  this.showDefaultContextMenu_ = val;
  // TODO: hook up right-click menu to actual menu manager
  if (val && this.canvas_) {
    this.canvas_.oncontextmenu = function() { return true; };
  }
  else if (this.canvas_) {
    this.canvas_.oncontextmenu = function() { return false; };
  }
};

Stage.prototype.getStageFocusRect = function() {
  return this.stageFocusRect_;
};
Stage.prototype.setStageFocusRect = function(val) {
  this.stageFocusRect_ = val;
};

Stage.prototype.getStageHeight = function() {
  return this.stageHeight_;
};
Stage.prototype.setStageHeight = function(val) {
  this.stageHeight_ = val;
};

Stage.prototype.getStageWidth = function() {
  return this.stageWidth_;
};
Stage.prototype.setStageWidth = function(val) {
  this.stageWidth_ = val;
};

Stage.prototype.getTabChildren = function() {
  return this.tabChildren_;
};
Stage.prototype.setTabChildren = function(val) {
  this.tabChildren_ = val;
};

Stage.prototype.getTextSnapshot = function() {
  return this.textSnapshot_;
};

Stage.prototype.getWidth = function() {
  return this.width_;
};
Stage.prototype.setWidth = function(val) {
  this.canvas_.width = val;
  this.width_ = val;
};









//----------------------------------------------------------------------------
// < Public Methods >                                                        -
//----------------------------------------------------------------------------

/**
 * Registers an event listener object with an EventDispatcher object so that the
 * listener receives notification of an event. You can register event listeners
 * on all nodes in the display list for a specific type of event, phase, and
 * priority.
 *
 * @param {string}
 *          type The event type.
 * @param {Function}
 *          listener The listener object.
 * @param {bool}
 *          useCapture Capture phase (true), or target/bubbling phase?
 * @param {int}
 *          priority Level of priority relative to other listeners.
 * @param {bool}
 *          useWeakReference Weak reference allows listener to be garbage
 *          collected. Strong does not.
 */
Stage.prototype.addEventlistener = function(type, listener,
    useCapture, priority, useWeakReference) {

  // set defaults for undefined values
  useCapture = useCapture || false;
  priority = priority || 0;
  useWeakReference = useWeakReference || false;

  console.log('Added event "' + type + '" listener');

  this.privateStore_.listeners.push({
    'type': type,
    'listener': listener,
    'useCapture': useCapture,
    'priority': priority,
    'useWeakReference': useWeakReference
  });

};

Stage.prototype.dispatchEvent = function(event) {

  var i = 0,
      max = this.privateStore_.listeners.length;

  for (i; i < max; i = i + 1) {

    if (this.privateStore_.listeners[i].type === event.type) {

      // Call the listener function, but apply it to the
      // target so 'this' is the correct scope
      this.privateStore_.listeners[i].listener.apply(this, [event]);

    }

  }

};

Stage.prototype.hasEventListener = function(type) {};

Stage.prototype.removeEventListener = function(type, listener, useCapture) {

  if (useCapture === undefined) {
    useCapture = true;
  }

  // TODO: remove an event listener from Stage

};






/**
 * @override
 */
Stage.prototype.addChild = function(child) {

  if (child instanceof DisplayObject) {

    if (child.parent) {
      child.parent.removeChild(child);
    }

    this.displayList_.push(child);

    child.addParent_(this);

    var e = new Event(Event.ADDED);
    e.target = child;

    this.dispatchEvent(e);

    return child;
  }

  return undefined; // TODO: what is appropriate return value on fail?

};

/**
 * @override
 */
Stage.prototype.addChildAt = function(child, index) {

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

  return undefined; // TODO: what is appropriate return value on fail?

};

Stage.prototype.assignFocus = function(objectToFocus, direction) {
  // TODO: function body
};

Stage.prototype.invalidate = function() {
  // TODO: function body
};

Stage.prototype.isFocusInaccessible = function() {
  // TODO: function body
};

Stage.prototype.removeChild = function(index) {

  var i = 0,
      len = this.displayList_.length;

  for (i; i < len; i++) {
    if (this.displayList_[i] === child) {
      this.displayList_.splice(i, 1);
      child.removeParent_();
      return child;
    }
  }

  return false;

};

Stage.prototype.removeChildAt = function(index) {

  if (this.displayList_.length >= index) {
    return this.displayList_.splice(index, 1);
    child.removeParent_();
    return child;
  }

  return false;

};

Stage.prototype.setChildIndex = function(child, index) {
  // TODO: function body
};
/*
Stage.prototype.swapChildrenAt = function(index1, index2) {
  // TODO: function body
};
*/
Stage.prototype.willTrigger = function(type) {
  // TODO: function body
};

Stage.prototype.toString = function toString() {
  return 'Stage';
};

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

beebe.magic.enhanceWithGettersAndSetters2(Stage.prototype);

goog.exportSymbol('flash.display.Stage', flash.display.STage);
goog.exportSymbol('Stage', Stage);