goog.provide('InteractiveObject');
goog.provide('flash.display.InteractiveObject');

goog.require('flash.display');
goog.require('flash.display.DisplayObject');

/**
 * Adobe InteractiveObject docs: http://bit.ly/9avgab
 * @constructor
 */
flash.display.InteractiveObject = function() {

  flash.display.DisplayObject.call(this);

  this.accessibilityImplementation_;
  this.doubleClickEnabled_;
  this.focusRect_;
  this.mouseEnabled_;
  this.tabEnabled_;
  this.tabIndex_;

};
goog.inherits(flash.display.InteractiveObject, flash.display.DisplayObject);

// TODO: Define getters 'n setters for public properties.

goog.exportSymbol('flash.display.InteractiveObject',
                  flash.display.InteractiveObject);
goog.exportSymbol('InteractiveObject', flash.display.InteractiveObject);

