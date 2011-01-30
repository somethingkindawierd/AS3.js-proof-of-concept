goog.provide('flash.events.EventDispatcher');
goog.provide('EventDispatcher');

goog.require('flash.events');

/**
 * Adobe Event Dispatcher docs: http://bit.ly/9NlZgy
 *
 * @this flash.events.EventDispatcher
 * @param {object}
 *          target The target of this event.
 * @constructor
 */
flash.events.EventDispatcher = EventDispatcher = function(target) {

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
EventDispatcher.prototype.addEventlistener =
    function(type, listener, useCapture, priority, useWeakReference) {

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

EventDispatcher.prototype.dispatchEvent = function(event) {

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

EventDispatcher.prototype.hasEventListener = function(type) {};

EventDispatcher.prototype.removeEventListener = function(type, listener,
    useCapture) {

  if (useCapture === undefined) {
    useCapture = true;
  }

//   TODO: remove an event listener from EventDispatcher

};

// toString():String
EventDispatcher.prototype.toString = function toString() {
  return 'Event Dispatcher';
};
