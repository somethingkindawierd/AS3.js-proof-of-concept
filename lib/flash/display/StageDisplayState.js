goog.provide('StageDisplayState');
goog.provide('flash.display.StageDisplayState');

goog.require('flash.display');

/**
 * @constructor
 */
flash.display.StageDisplayState = StageDisplayState = function() {};

/**
 * @const
 */
flash.display.StageDisplayState.FULL_SCREEN = 'fullScreen';

/**
 * @const
 */
flash.display.StageDisplayState.NORMAL = 'normal';

goog.exportSymbol('flash.display.StageDisplayState',
                  flash.display.StageDisplayState);
goog.exportSymbol('StageDisplayState', StageDisplayState);

