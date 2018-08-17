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
  Usage: 
    const ruleSet = verdict().parse(ruleCriteria);
    const result = ruleSet.test({
      previousValue: formResponses || {}, // current answers
      nextValue: nextFormResponses,       // next answers
      init: init === true,                // initializaiton flag - fire onInit only when true
      fields,                             // formDesignFields - field.id === this.path
    });
 */
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
      context: context,
      init: init,
      nextValue: nextValue,
      previousValue: previousValue,
      ruleValue: this.value,
    }) ^ this.invert
  );
};
