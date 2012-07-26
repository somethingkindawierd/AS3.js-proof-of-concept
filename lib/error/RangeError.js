goog.provide('flash.errors.RangeError');
//goog.provide('RangeError');

goog.require('flash.errors');

/**
 * Adobe Docs for RangeError: http://bit.ly/99tWLE
 * @constructor
 * @param {string} message The error message.
 */
flash.errors.RangeError = function(message) {

    flash.errors.Error.call(this, message);

};
goog.inherits(flash.errors.RangeError, flash.errors.Error);

//Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('flash.errors.RangeError', flash.errors.RangeError);
goog.exportSymbol('RangeError', flash.errors.RangeError);
