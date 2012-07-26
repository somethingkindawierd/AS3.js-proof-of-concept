goog.provide('flash.events.EventDispatcher');
goog.provide('EventDispatcher');

goog.require('flash.events');

(function() {

/**
 * Adobe Event Dispatcher docs: http://bit.ly/9NlZgy
 *
 * @this flash.events.EventDispatcher
 * @param {object}
 *          target The target of this event.
 * @constructor
 */
flash.events.EventDispatcher = function(target) {

  /**
   * @private
   */
  this.target_ = target || null;

  /**
   * @private
   */
  this.privateStore_ = {};

  this.privateStore_.listeners = [];

};

// 'cause we're lazy, let's shorten that namespace chain to the prototype...
var proto = flash.events.EventDispatcher.prototype;

/**
 * Registers an event listener object with an EventDispatcher object so that the
 * listener receives notification of an event. You can register event listeners
 * on all nodes in the display list for a specific type of event, phase, and
 * priority.
 *
 * @param {string} type The event type.
 * @param {Function} listener The listener object.
 * @param {bool} useCapture Capture phase (true), or target/bubbling phase?
 * @param {int} priority Level of priority relative to other listeners.
 * @param {bool} useWeakReference Weak reference allows listener to be garbage
 * collected. Strong does not.
 */
proto.addEventlistener = function(type, listener, useCapture,
                                  priority, useWeakReference) {

  // set defaults for undefined values
  useCapture = useCapture || false;
  priority = priority || 0;
  useWeakReference = useWeakReference || false;

  console.log('Added event "' + type + '" listener');

  this.privateStore_.listeners.push( {
    'type': type,
    'listener': listener,
    'useCapture': useCapture,
    'priority': priority,
    'useWeakReference': useWeakReference
  });

};

proto.dispatchEvent = function(event) {

  var i = 0,
      max = this.privateStore_.listeners.length;

  for (i; i < max; i = i + 1) {

    if (this.privateStore_.listeners[i].type === event.type) {

      // Call the listener function, but apply it to the
      // target so 'this' is the correct scope
      this.privateStore_.listeners[i].listener.apply(this.target_, [event]);

    }

  }

};

proto.hasEventListener = function(type) {};

proto.removeEventListener = function(type, listener,
    useCapture) {

  if (useCapture === undefined) {
    useCapture = true;
  }

//   TODO: remove an event listener from EventDispatcher

};

// toString():String
proto.toString = function toString() {
  return 'Event Dispatcher';
};

goog.exportSymbol('flash.events.EventDispatcher', flash.events.EventDispatcher);
goog.exportSymbol('EventDispatcher', flash.events.EventDispatcher);

})();
