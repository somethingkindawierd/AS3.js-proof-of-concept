goog.provide('flash.errors.Error');
//goog.provide('Error');

goog.require('flash.errors');
goog.require('stacktrace');

var BrowserError = Error;

/**
 * Base Error Class: http://bit.ly/amOu1s
 *
 * @constructor
 * @param {string} message The error message.
 * @param {number} id The error id.
 */
flash.errors.Error = function(message, id) {

  this.message_ = message || '';
  this.errorId_ = (!isNaN(id)) ? id : 0;
  this.name = '';

  // We borrow the stack from a generic error message.
  // In the stack-trace we fetch the stack string, remove the Error classes
  // from the beginning, and then we have the stack from the generating class.
//  e = new BrowserError();
//  this.stack_ = e.stack;

  // Grab the stack trace and remove the top 4 items, which will
  // include everything up to this function call. This leaves the stack
  // holding only function calls that actually generated the error.
  this.stack_ = printStackTrace().slice(4);

};

flash.errors.Error.prototype.getMessage = function() {
  return this.message_;
};


flash.errors.Error.prototype.setMessage = function(val) {
  this.message_ = val;
};


flash.errors.Error.prototype.getName = function() {
  return this.name_;
};

flash.errors.Error.prototype.setName = function(val) {
  this.name_ = val;
};

flash.errors.Error.prototype.getErrorId = function() {
  return this.errorId_;
};

flash.errors.Error.prototype.getStackTrace = function() {

  return this.stack_;

//  var pattern = /@:0[\W\w]*\(null\)([\W\w]*)/,
//      m = '';
//
//  m = this.stack_.match(pattern);
//
//  return this.name_ + m[1];
};

flash.errors.Error.prototype.toString = function toString() {
  return (this.message_ !== '') ? ('Error: ' + this.message_) : 'Error';
};

beebe.magic.enhanceWithGettersAndSetters2(flash.errors.Error.prototype);

//Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('flash.errors.Error', flash.errors.Error);
//goog.exportSymbol('Error', Error);


