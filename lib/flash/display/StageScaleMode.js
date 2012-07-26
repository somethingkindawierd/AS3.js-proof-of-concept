goog.provide('StageScaleMode');
goog.provide('flash.display.StageScaleMode');

goog.require('flash.display');

/**
 * @constructor
 */
flash.display.StageScaleMode = StageScaleMode = function() {};

/**
 * @const
 */
flash.display.StageScaleMode.EXACT_FIT = 'exactFit';

/**
 * @const
 */
flash.display.StageScaleMode.NO_BORDER = 'noBorder';

/**
 * @const
 */
flash.display.StageScaleMode.NO_SCALE = 'noScale';

/**
 * @const
 */
flash.display.StageScaleMode.SHOW_ALL = 'showAll';

goog.exportSymbol('flash.display.StageScaleMode', flash.display.StageScaleMode);
goog.exportSymbol('StageScaleMode', StageScaleMode);

