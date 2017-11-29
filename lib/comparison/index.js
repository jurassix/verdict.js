var weighted = require('weighted');
var versionCompare = require('version-compare.js');
var isEqual = require('lodash/isEqual');

/**
 * Just check if a exists, aka is a non empty value
 */
exports.onInit = function exists(props) {
  var init = props.init;
  return init === true;
};

/**
 * Just check if a exists, aka is a non empty value
 */
exports.onChange = function exists(props) {
  var nextValue = props.nextValue;
  var previousValue = props.previousValue;
  return !isEqual(nextValue, previousValue);
};

/**
 * Just check if a exists, aka is a non empty value
 */
exports.exists = function exists(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return !!nextValue;
};

/**
 * Make sure the variable is an empty value
 */
exports.nexists = function nexists(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return !nextValue;
};

/**
 * Regular expression match
 */
exports.matches = function matches(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  ruleValue = 'string' === typeof ruleValue ? new RegExp(ruleValue) : ruleValue;
  return ruleValue.test(nextValue);
};

/**
 * Negative regular expression match
 */
exports.nmatches = function nmatches(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  ruleValue = 'string' === typeof ruleValue ? new RegExp(ruleValue) : ruleValue;
  return !ruleValue.test(nextValue);
};

/**
 * String contains
 */
exports.contains = function contains(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return 'string' === typeof nextValue && !!~nextValue.indexOf(ruleValue);
};

/**
 * String *not* contains
 */
exports.ncontains = function ncontains(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return 'string' !== typeof nextValue || !~nextValue.indexOf(ruleValue);
};

/**
 * Check for non-strict equals
 */
exports.eq = function eq(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return isEqual(nextValue, ruleValue);
};

/**
 * Check for non-strict non-equals
 */
exports.neq = function neq(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return !isEqual(nextValue, ruleValue);
};

/**
 * Check for strict equals
 */
exports.is = function is(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue === ruleValue;
};

/**
 * Check for strict non-equals
 */
exports.not = function not(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue !== ruleValue;
};

/**
 * Check for greater than
 */
exports.gt = function gt(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue > ruleValue;
};

/**
 * Check for greater than/equal tonextValueruleValue*/
exports.gte = function gte(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue >= ruleValue;
};

/**
 * Check for less than
 */
exports.lt = function lt(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue < ruleValue;
};

/**
 * Check for less than/equal to
 */
exports.lte = function lte(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue <= ruleValue;
};

/**
 * Check if value is in a range
 */
exports.inRange = function inRange(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue >= ruleValue[0] && nextValue <= ruleValue[1];
};

/**
 * Check if value is *not* in a range
 */
exports.ninRange = function ninRange(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue < ruleValue[0] || nextValue > ruleValue[1];
};

/**
 * Check if value is evenly divisible by
 */
exports.divisibleBy = function divisibleBy(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue % ruleValue === 0;
};

/**
 * Check if value is *not* evenly divisible by
 */
exports.ndivisibleBy = function ndivisibleBy(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return nextValue % ruleValue !== 0;
};

/**
 * Check if probability of weight fits (TODO: Desc and name)
 */
exports.weight = function weight(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return weighted([true, false], [ruleValue, 1 - ruleValue]);
};

/**
 * Check if probability of weight *not* fits (TODO: Desc and name)
 */
exports.nweight = function nweight(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return weighted([false, true], [ruleValue, 1 - ruleValue]);
};

/**
 * Use software version logic, compare a to b and check for equality
 */
exports.eqVersion = function eqVersion(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return versionCompare(nextValue, ruleValue) === 0;
};

/**
 * Check if version a is greater than version b
 */
exports.gtVersion = function gtVersion(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return versionCompare(nextValue, ruleValue) === -1;
};

/**
 * Check if version a is greater or equal to than version b
 */
exports.gteVersion = function gteVersion(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  var cmp = versionCompare(nextValue, ruleValue);
  return cmp === 0 || cmp === -1;
};

/**
 * Check if version a is less than version b
 */
exports.ltVersion = function ltVersion(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  return versionCompare(nextValue, ruleValue) === 1;
};

/**
 * Check if version a is less than or equal to version b
 */
exports.lteVersion = function lteVersion(props) {
  var nextValue = props.nextValue;
  var ruleValue = props.ruleValue;
  var cmp = versionCompare(nextValue, ruleValue);
  return cmp === 0 || cmp === 1;
};

// TODO: the signature here is b
/**
 * Compile manual javascript with variable replacement ( {var.name} )
 */
exports.compile = function compile(props) {
  var nextValue = props.nextValue;
  var previousValue = props.previousValue;
  var ruleValue = props.ruleValue;
  var compiler = null;
  var cfg = ruleValue
    .replace(/^([\s]+)/, '')
    .replace(/([\s]+)$/, '')
    .replace(/^(return)/i, '')
    .replace(/(;)$/, '');
  /*jshint evil:true */
  compiler = new Function('value', 'previousValue', 'return !!(' + cfg + ');');

  return compiler(nextValue, previousValue);
};
