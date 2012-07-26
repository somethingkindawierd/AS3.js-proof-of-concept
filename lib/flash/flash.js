goog.provide('flash');

goog.require('beebe');
goog.require('sugar');

flash = function() {};

/**
 * Displays expressions, or writes to log files, while debugging. A single trace
 * statement can support multiple arguments. If any argument in a trace
 * statement includes a data type other than a String, the trace function
 * invokes the associated toString() method for that data type. For example, if
 * the argument is a Boolean value the trace function invokes Boolean.toString()
 * and displays the return value.
 *
 */
trace = function() {

  if (arguments.length > 0) {
    for (var i = 0, j = arguments.length; i < j; i++) {
      console.log(arguments[i]);
    }
  }

};

// TODO: Add other Top Level functions:
// http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/

//Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('flash', flash);

