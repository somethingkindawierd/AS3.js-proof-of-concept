goog.provide('StageQuality');
goog.provide('flash.display.StageQuality');

goog.require('flash.display');

/**
 * @constructor
 */
flash.display.StageQuality = StageQuality = function() {};

/**
 * @const
 */
flash.display.StageQuality.BEST = 'best';

/**
 * @const
 */
flash.display.StageQuality.HIGH = 'high';

/**
 * @const
 */
flash.display.StageQuality.LOW = 'low';

/**
 * @const
 */
flash.display.StageQuality.MEDIUM = 'medium';

goog.exportSymbol('flash.display.StageQuality', flash.display.StageQuality);
goog.exportSymbol('StageQuality', StageQuality);

