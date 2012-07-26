if (!console) {
  //this is here and not below in definition of console cause
  // goog.provides must be alphabetical according to gjslint --strict
  goog.provide('console');
}
goog.provide('sugar');

goog.require('beebe');

if (!console) {
  var console = { log: function() {} };
  //Ensures the symbol will be visible after compiler renaming.
  goog.exportSymbol('console', console);
}


/**
 * A generic way to define getters/setters for
 * objects in both the old Mozilla way and the new ECMA standard way,
 * which should work in I.E., at least on DOM Elements.
 *
 * more info:
 * John Resig: http://ejohn.org/blog/javascript-getters-and-setters/
 * Robert Nyman: http://bit.ly/duSGZU
 *
 * https://developer.mozilla.org/en/JavaScript/Reference/global_objects/object/defineproperties
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty
 *
 * @author somethingkindawierd@gmail.com (Jon Beebe)
 */
if (!Object.defineProperty && Object.__defineGetter__) {
  /**
   * very basic implementation ECMA5 Object.defineProperty
   * @param {object} target The object to define properties on.
   * @param {string} label The property label.
   * @param {object} funcs The functions for the label.
   */
  Object.prototype.defineProperty = function(target, label, funcs) {
    if (funcs.get) {
      target.__defineGetter__(label, funcs.get);
    }
    if (funcs.set) {
      target.__defineSetter__(label, funcs.set);
    }
  };
}

if (!Object.defineProperties) {
  /**
   * very basic implementation ECMA5 Object.defineProperties
   * @param {object} target The object to define properties on.
   * @param {object} p All properties to define.
   */
  Object.prototype.defineProperties = function(target, p) {
    for (var label in p) {
      if (p.hasOwnProperty(label)) {
        Object.defineProperty(
            target,
            label,
            {
              get: p[label].get,
              set: p[label].set
            }
        );
      }
    }
  };
}
