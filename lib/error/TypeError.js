goog.provide('flash.errors.TypeError');
// we cannot do this because goog already provides a TypeError namespace:
//goog.provide('TypeError');

goog.require('flash.errors.Error');

(function() {

  // Store the browser's original TypeError definition.
  var TypeError_ = TypeError;

  /**
   * Type Error
   *
   * @constructor
   * @param {string} message The error message.
   * @param {number} id The error id.
   */
  flash.errors.TypeError = function(message, id) {

    // If the 2nd param is a string then there's a good chance someone's trying
    // to create the original TypeError, so forward the call...
    if (id && !goog.string.isNumeric(id)) {
      return TypeError_.apply(TypeError_, arguments);
    }

    // We'll assume we need an AS3-style TypeError
    else {
      flash.errors.Error.call(this, message, id);
      this.name = 'TypeError';
    }
  };
  goog.inherits(flash.errors.TypeError, flash.errors.Error);

  beebe.magic.enhanceWithGettersAndSetters2(flash.errors.TypeError.prototype);

  //Ensures the symbol will be visible after compiler renaming.
  goog.exportSymbol('flash.errors.TypeError', flash.errors.TypeError);
  goog.exportSymbol('TypeError', flash.errors.TypeError);

})();

