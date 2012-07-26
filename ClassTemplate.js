goog.provide('Class');
goog.provide('flash.ns.Class');

goog.requires('flash.ns');

(function() {

  /**
   * Class Template
   *
   * @constructor
   */
  flash.ns.Class = function() {

    //--------------------------------------------------------------------------
    // < Private Attributes >                                                  -
    // Not truly private, but the _ denotes it                                 -
    // Google Closure Compiler will treat as private and offer compile errors  -
    // if used incorrectly. Note Google Closure Styles recommend private       -
    // properties end with a trailing _ (underscore).                          -
    //--------------------------------------------------------------------------

    /** @private */
    this.name_;

    /** @private */
    this.other_;

    /** @private */
    this.other2_;

    //--------------------------------------------------------------------------
    // </ Private Attributes >                                                 -
    //--------------------------------------------------------------------------

  };
  goog.inherits(flash.ns.Class, Parent);
  // Notice no new-line between this & constructor
  // Class -> Parent Class -> Parent Class -> Object

  //----------------------------------------------------------------------------
  //< Getters n Setters >                                                      -
  // Here we follow the standard javascript get/set definition pattern of      -
  // getName/setName. Using the magic method seen at the bottom of the script  -
  // these functions will be used to define official getters/setters.          -
  //----------------------------------------------------------------------------

  flash.ns.Class.prototype.getName = function() {
    return this.name_;
  };

  flash.ns.Class.prototype.setName = function(val) {
    this.name_ = val;
  };

  //----------------------------------------------------------------------------
  // These are not supported by ECMA 3, and thus not by Google Closure         -
  // compiler. Someday...                                                      -
  //----------------------------------------------------------------------------

  //Object.defineProperties(Class.prototype, {
  //  name: {
  //    get: function() {
  //      return this.name_;
  //    },
  //    set: function(val) {
  //      this.name_ = val;
  //    }
  //  }
  //});

  //----------------------------------------------------------------------------
  // </ Getters n Setters >                                                    -
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  // < Public Methods >                                                        -
  //----------------------------------------------------------------------------

  /**
   * Some public method.
   * @param {type} param Description.
   */
  flash.ns.Class.prototype.publicMethod = function(param) {

    // TODO: function body

  };

  /**
   * Render object to string.
   * @override
   * @return {string} Object as string.
   */
  flash.ns.Class.prototype.toString = function toString() {

    return this.name_;

  };

  // Here we automagically turn all getName and setName methods into official
  // ECMA 5 getters and setters. We don't do this above because it's not
  // supported by Google Closure.
  beebe.magic.enhanceWithGettersAndSetters2(flash.ns.Class.prototype);

  // Export symbols to global namespace. Prevents Google from renaming them.
  goog.exportSymbol('flash.ns.Class', flash.ns.Class);
  goog.exportSymbol('Class', flash.ns.Class);

})();

