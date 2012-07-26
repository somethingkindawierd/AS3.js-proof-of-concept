goog.provide('beebe');

goog.require('goog.array');
goog.require('goog.math');

/**
 * Provide a general-purpose namespace for utility methods with no other
 * place to live. Most of these used to be mixins for the underscore
 * library and have been moved here.
 */
(function() {

  beebe = {

    string: {

      /**
       * force 1st letter to lowercase.
       *
       * @param {string} string The input string.
       * @return {string} String with 1st character lowered.
       */
      lowercaseFirstLetter: function(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
      }
    },

    array: {
      /**
       * Inspired by the underscore.js compact method.
       * Remove all falsy values from the array.
       *
       * @param {array} array The array to compact.
       * @return {array} The compacted array.
       */
      compact: function(array) {
        return goog.array.filter(array, function(value) { return !!value; });
      }
    },

    func: {

      /*
       * What I'm trying to do with these functions is discover if a function
       * takes arguments or not. The only Idea I could find was decompiling
       * the function and regex-matching its pattern.
       *
       * I know there are issues with this:
       * http://perfectionkills.com/those-tricky-functions/
       *
       * Is there a better way?
       */

      /**
       * Check a function's definition to see if it requires arguments.
       *
       * @param {Function} func The function to test.
       * @return {boolean} True if args required, false otherwise.
       */
      takesArgs: function(func) {
        return !this.takesNoArgs(func);
        //return !/function(( *|[\w]*)\()(*?)(\))/.test(func.toString());
      },

      /**
       * Check a function's definition to see if it requires arguments.
       *
       * @param {Function} func The function to test.
       * @return {boolean} True if args required, false otherwise.
       */
      takesNoArgs: function(func) {
        return /function(( *|[\w]*)\()(\))/.test(func.toString());
      },

      /**
       * Check a function's definition to see if it requires more than
       * one argument.
       *
       * @param {Function} func The function to test.
       * @return {boolean} True if args required, false otherwise.
       */
      takesMultipleArgs: function(func) {
        return /function(( *|[\w]*)\()(.+?,.+)(\))/.test(func.toString());
      }
    }, /* </ func > */

    math: {

      /**
       * Limit a number between a given min/max.
       *
       * @deprecated Use goog.math.clamp.
       *
       * @param {number} value The input number.
       * @param {number} min The minimum value to return.
       * @param {number} max The maximum value to return.
       * @return {number} The input number if it is within bounds, or the
       *                  nearest number within the bounds.
       */
      limit: function(val, min, max) {
        return goog.math.clamp(val, min, max);
      },

      /**
       * Is a given value a number?
       * Thank you underscore.js
       *
       * @param {mixed} obj The input value to test.
       * @return {boolean} True if number, false otherwise.
       */
      isNumeric: function(obj)
      {
        return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
      }
    },

    color: {

      /**
       * Ensure that the input is a valid html number, formatted as #ffffff.
       *
       * @param {string|int} color The input value.
       * @return {string} A valid html hexadecimal color.
       */
      getAsHexColorString: function(color) {

        // TODO: super incomplete...handle other cases, color types, string formats...

        // Handle the AS3 style colors, which can be passed as a literal
        // 0xffffff, which js converts to a base10 number.
        // Use toString to convert the number to a hexadecimal color.
        // http://www.hunlock.com/blogs/The_Complete_Javascript_Number_Reference#quickIDX2
        if(beebe.math.isNumeric(color)) {
          // Since a number like 0x000009 becomes 9, we pad to 6 characters.
          color = '#' + goog.string.padNumber(color.toString(16), 6);
        }

        return color;
      },

			/**
			 * http://snipplr.com/view.php?codeview&id=43542
 			 */
			hex2rgb: function(hex, opacity) {
				var rgb = hex.replace('#', '').match(/(.{2})/g);

				var i = 3;
				while (i--) {
					rgb[i] = parseInt(rgb[i], 16);
				}

				if (typeof opacity == 'undefined' || isNaN(opacity)) {
					return 'rgb(' + rgb.join(',') + ')';
				}

				return 'rgba(' + rgb.join(',') + ',' + opacity + ')';
			}
    },

    magic: {

      /**
       * Enhance an object by turning all getX and setX methods into official
       * getters and setters that are aliases for the getX and setX methods.
       *
       * This class uses the forEach method that limits the enumerated
       * properties to only those belonging to this object. Normally, this
       * would be the proper & safe way to do this. However, when inheriting
       * from parent classes, if the parent has a setX method, this will not
       * see the property and thus not define the setter on the child.
       *
       * @param {object} A class prototype, passed as Class.prototype.
       */
      enhanceWithGettersAndSetters: function(c) {

        // trace('Enhancing ', c);

        var props = {};

        goog.array.forEach(c, function(prop, n, obj) {

          // trace('Processing property ' + n);

          if (n.indexOf('get') === 0) {
            n = beebe.string.lowercaseFirstLetter(n.substr(3));
            // trace('Name of getter is ' + n);
            props[n] = props[n] || {};
            props[n].get = prop;
          }
          else if (n.indexOf('set') === 0) {
            n = beebe.string.lowercaseFirstLetter(n.substr(3));
            // trace('Name of setter is ' + n);
            props[n] = props[n] || {};
            props[n].set = prop;
          }

        }); /* </ _.each > */

        if (props !== {}) {
          // trace('props:', props);
          Object.defineProperties(c, props);
        }
      },

      /**
       * Enhance an object by turning all getX and setX methods into official
       * getters and setters that are aliases for the getX and setX methods.
       *
       * This class DOES NOT limit the for loop to only properties belonging
       * to this object so we can see *all* methods available to a child class.
       * While not typically considered a safe thing to do, this function only
       * creates getter & setter aliases where appropriate (methods prefixed
       * with 'set' or 'get'), so it should not have any undesired side effects.
       *
       * hehe...famous last words of a programmer...
       *
       * @param {object} A class prototype, passed as Class.prototype.
       */
      enhanceWithGettersAndSetters2: function(c) {

        var props = {},
            prop = null,
            n = null;

        for (prop in c) {
          //trace('Processing property ' + prop);

          if (prop.indexOf('get') === 0) {
            // We only define getters using funcs that do *not* take arguments.
            if (beebe.func.takesNoArgs(c[prop])) {
              n = beebe.string.lowercaseFirstLetter(prop.substr(3));
              //trace('Name of getter is ' + n);
              props[n] = props[n] || {};
              //trace('defining prop ' + n + ' getter which is ', c[prop]);
              props[n].get = c[prop];
            }
            else {
              trace('failed test...');
            }
          }
          else if (prop.indexOf('set') === 0) {
            // We only define setters using functions taking 1 argument.
            if (!beebe.func.takesMultipleArgs(c[prop])) {
              n = beebe.string.lowercaseFirstLetter(prop.substr(3));
              //trace('Name of setter is ' + n);
              props[n] = props[n] || {};
              //trace('defining prop ' + n + ' setter which is ',
              //      c[prop].toString());
              props[n].set = c[prop];
            }
          }
        }

        if (props !== {}) {
          // trace('props:', props);
          Object.defineProperties(c, props);
        }

      } /* </ enhanceWithGettersAndSetters2 > */

    } /* </ magic > */

  };

  goog.exportSymbol('beebe', beebe);

})();

