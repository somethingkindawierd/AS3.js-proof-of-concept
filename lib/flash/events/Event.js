goog.provide('flash.events.Event');
//goog.provide('Event');

goog.require('flash.events');

/**
 * Adobe Event object docs: http://bit.ly/9LkfBS
 *
 * @this flash.events.Event
 *
 * @param {string} type The event name/type.
 * @param {bool} bubbles Does this event bubble?
 * @param {bool} cancelable Can this event be canceled?
 * @constructor
 */
flash.events.Event = function(type, bubbles, cancelable) {

  // Public Properties
  this.bubbles = bubbles || false;
  this.cancelable = cancelable || false;
  this.currentTarget = {};
  this.eventPhase = 0;
  this.target = {};
  this.type = type;

};

// toString():String
flash.events.Event.prototype.toString = function toString() {
  return 'Event Type: "' + this.type + '"';
};

flash.events.Event.prototype.clone = function() {};

// formatToString(className:String, ... arguments):String
flash.events.Event.prototype.formatToString = function(className) {};

// isDefaultPrevented():Boolean
flash.events.Event.prototype.isDefaultPrevented = function() {};

// preventDefault():void
flash.events.Event.prototype.preventDefault = function() {};

// stopImmediatePropagation():void
flash.events.Event.prototype.stopImmediatePropagation = function() {};

// stopPropagation():void
flash.events.Event.prototype.stopPropagation = function() {};


// Event Constants

/**
 * @const
 */
flash.events.Event.ACTIVATE = 'activate';

/**
 * @const
 */
flash.events.Event.ADDED = 'added';

/**
 * @const
 */
flash.events.Event.ADDED_TO_STAGE = 'addedToStage';

/**
 * @const
 */
flash.events.Event.ENTER_FRAME = 'enterFrame';

/**
 * @const
 */
flash.events.Event.EXIT_FRAME = 'exitFrame';

/**
 * @const
 */
flash.events.Event.FRAME_CONSTRUCTED = 'frameConstructed';

/**
 * @const
 */
flash.events.Event.REMOVED = 'removed';

/**
 * @const
 */
flash.events.Event.REMOVED_FROM_STAGE = 'removedFromStage';

/**
 * @const
 */
flash.events.Event.RENDER = 'render';

// TODO: Add all other Event constants.

//Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('flash.events.Event', flash.events.Event);
goog.exportSymbol('Event', flash.events.Event);

