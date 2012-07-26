goog.provide('flash.errors.ArgumentError');
//goog.provide('ArgumentError');

goog.require('flash.errors');

/**
 * Adobe Docs for ArgumentError: http://bit.ly/99tWLE
 * @constructor
 * @param {string} message The error message.
 */
flash.errors.ArgumentError = function(message) {

    flash.errors.Error.call(this, message);

};
goog.inherits(flash.errors.ArgumentError, flash.errors.Error);

//Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('flash.errors.ArgumentError', flash.errors.ArgumentError);
goog.exportSymbol('ArgumentError', flash.errors.ArgumentError);
