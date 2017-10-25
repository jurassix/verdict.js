var selectn = require('selectn');
var comparators = require('./comparison');

module.exports = Rule;

function Rule(rule) {
  if (!(this instanceof Rule)) {
    return new Rule(rule);
  }
  rule = rule || {};
  this.path = rule.path || '';
  this.comparator = rule.comparator || '';
  this.value = rule.value || '';
  this.invert = !!rule.invert;
}

/**
 * Test our rule with the given context.
 *   If a second argument is supplied and is a callback,
 *   we will pass the results to that async-style
 */
// TODO don't support legacy api, nextValue is too common, but symbolic key is too verbose
Rule.prototype.test = function test(context) {
  var nextValue = selectn(this.path, context) || '';
  var previousValue = '';
  var init = context['init'] === true;

  if (context.hasOwnProperty('nextValue')) {
    nextValue =
      selectn(['nextValue'].concat(this.path.split('.')), context) || '';
  }

  if (context.hasOwnProperty('previousValue')) {
    previousValue =
      selectn(['previousValue'].concat(this.path.split('.')), context) || '';
  }

  var comparator = comparators[this.comparator];

  if (!comparator) {
    throw new Error('Invalid comparator or comparator not supplied');
  }

  return !!(
    comparator.call(null, {
      init: init,
      nextValue: nextValue,
      previousValue: previousValue,
      ruleValue: this.value,
    }) ^ this.invert
  );
};
