goog.provide('flash.errors.IllegalOperationError');
goog.provide('IllegalOperationError');

goog.require('flash.errors');

/**
 * Adobe Docs for ArgumentError: http://help.adobe.com/en_US/AS3LCR/Flash_10.0/flash/errors/IllegalOperationError.html
 * @constructor
 * @param {string} message The error message.
 */
flash.errors.IllegalOperationError = IllegalOperationError = function(message) {

  this.init = function(message) {
    this.uber('init', message);
  };

  this.init(message);

};

IllegalOperationError.inherits(Error);

//Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('flash.errors.IllegalOperationError', flash.errors.IllegalOperationError);
goog.exportSymbol('IllegalOperationError', IllegalOperationError);
