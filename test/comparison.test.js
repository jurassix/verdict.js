var should = require('should');
var comparators = require('../lib/comparison');

/*global it*/
/*global describe*/

describe('Comparison test', function() {
  describe('onInit', function() {
    it('should be truthy when init is set true', function() {
      comparators.onInit({ init: true }).should.equal(true);
    });
    it('should be falsey when init is set false', function() {
      comparators.onInit({ init: false }).should.equal(false);
    });
    it('should be falsey when init is undefined', function() {
      comparators.onInit({}).should.equal(false);
    });
  });

  describe('onChange', function() {
    it('should be truthy when values are different', function() {
      comparators
        .onChange({ nextValue: 1, previousValue: 0 })
        .should.equal(true);
    });
    it('should be falsey when values are same', function() {
      comparators
        .onChange({ nextValue: 1, previousValue: 1 })
        .should.equal(false);
    });
  });

  describe('Equals/Nequals', function() {
    it('should compare equals correctly, number same type', function() {
      comparators.eq({ nextValue: 1, ruleValue: 1 }).should.equal(true);
    });
    it.skip('should compare equals correctly, number different types', function() {
      comparators.eq({ nextValue: 1, ruleValue: '1' }).should.equal(true);
    });
    it('should compare equals to be false correctly', function() {
      comparators
        .eq({ nextValue: 'one string', ruleValue: 'two string' })
        .should.equal(false);
    });
    it('should handle empty values when processing equals', function() {
      comparators
        .eq({ nextValue: undefined, ruleValue: 1 })
        .should.equal(false);
    });
    it('should compare not equals correctly, number same type', function() {
      comparators.neq({ nextValue: 1, ruleValue: 2 }).should.equal(true);
    });
    it.skip('should compare not equals to be false correctly', function() {
      comparators.neq({ nextValue: '1', ruleValue: 1 }).should.equal(false);
    });
    it('should handle empty values when processing not equals', function() {
      comparators
        .neq({ nextValue: undefined, ruleValue: 1 })
        .should.equal(true);
    });
  });

  describe('Identity/Negative Identity', function() {
    it('should compare identity true correctly', function() {
      comparators.is({ nextValue: 1, ruleValue: 1 }).should.equal(true);
    });
    it('should compare identity false correctly, values', function() {
      comparators.is({ nextValue: 1, ruleValue: 2 }).should.equal(false);
    });
    it('should compare identity false correctly, types', function() {
      comparators.is({ nextValue: 1, ruleValue: '1' }).should.equal(false);
    });
    it('should handle empty values when processing identity', function() {
      comparators
        .is({ nextValue: undefined, ruleValue: 1 })
        .should.equal(false);
    });
    it('should compare negative identity true correctly', function() {
      comparators.not({ nextValue: 1, ruleValue: 2 }).should.equal(true);
    });
    it('should compare negative identity false correctly, values', function() {
      comparators.not({ nextValue: 1, ruleValue: 1 }).should.equal(false);
    });
    it('should handle empty values for negative identity', function() {
      comparators
        .not({ nextValue: undefined, ruleValue: 1 })
        .should.equal(true);
    });
  });

  describe('GT/LT/GTE/LTE', function() {
    it('should compare gt true correctly', function() {
      comparators.gt({ nextValue: 1, ruleValue: 0 }).should.equal(true);
    });
    it('should compare gt false correctly', function() {
      comparators.gt({ nextValue: 0, ruleValue: 1 }).should.equal(false);
    });
    it('should handle empty values when processing gt', function() {
      comparators
        .gt({ nextValue: undefined, ruleValue: 1 })
        .should.equal(false);
    });
    it('should compare gte true correctly', function() {
      comparators.gte({ nextValue: 1, ruleValue: 0 }).should.equal(true);
    });
    it('should compare gte false correctly', function() {
      comparators.gte({ nextValue: 0, ruleValue: 1 }).should.equal(false);
    });
    it('should handle empty values when processing gte', function() {
      comparators
        .gte({ nextValue: undefined, ruleValue: 1 })
        .should.equal(false);
    });
    it('should compare lt true correctly', function() {
      comparators.lt({ nextValue: 0, ruleValue: 1 }).should.equal(true);
    });
    it('should compare lt false correctly', function() {
      comparators.lt({ nextValue: 1, ruleValue: 0 }).should.equal(false);
    });
    it('should handle empty values when processing lt', function() {
      comparators
        .lt({ nextValue: undefined, ruleValue: 1 })
        .should.equal(false);
    });
    it('should compare lte true correctly', function() {
      comparators.lte({ nextValue: 0, ruleValue: 1 }).should.equal(true);
    });
    it('should compare lte false correctly', function() {
      comparators.lte({ nextValue: 1, ruleValue: 0 }).should.equal(false);
    });
    it('should handle empty values when processing lte', function() {
      comparators
        .lte({ nextValue: undefined, ruleValue: 1 })
        .should.equal(false);
    });
  });

  describe('Range/Negative Range', function() {
    it('should compare range true correctly', function() {
      comparators
        .inRange({ nextValue: 3, ruleValue: [0, 4] })
        .should.equal(true);
    });
    it('should compare range false correctly', function() {
      comparators
        .inRange({ nextValue: 5, ruleValue: [0, 4] })
        .should.equal(false);
    });
    it('should handle empty values when processing range', function() {
      comparators
        .inRange({ nextValue: undefined, ruleValue: [0, 4] })
        .should.equal(false);
    });
    it('should compare neg range true correctly', function() {
      comparators
        .ninRange({ nextValue: 3, ruleValue: [4, 6] })
        .should.equal(true);
    });
    it('should compare neg range false correctly', function() {
      comparators
        .ninRange({ nextValue: 3, ruleValue: [0, 4] })
        .should.equal(false);
    });
    it('should handle empty values when processing neg range', function() {
      comparators
        .ninRange({ nextValue: undefined, ruleValue: [0, 4] })
        .should.equal(false);
    });
  });

  describe('Compiler', function() {
    it('should compare compile true correctly', function() {
      comparators
        .compile({ nextValue: null, ruleValue: '1 == 1' })
        .should.equal(true);
    });
    it('should compare compile false correctly', function() {
      comparators
        .compile({ nextValue: null, ruleValue: '1 == 2' })
        .should.equal(false);
    });
  });

  describe('RegEx/Negative RegEx', function() {
    it('should compare match true correctly', function() {
      comparators
        .matches({ nextValue: 'meh', ruleValue: /^meh$/ })
        .should.equal(true);
    });
    it('should compare match false correctly', function() {
      comparators
        .matches({ nextValue: 'beh', ruleValue: /merf/ })
        .should.equal(false);
    });
    it('should handle empty values when processing match', function() {
      comparators
        .matches({ nextValue: undefined, ruleValue: /^meh$/ })
        .should.equal(false);
    });
    it('should compare neg match true correctly', function() {
      comparators
        .nmatches({ nextValue: 'meh', ruleValue: /merf/ })
        .should.equal(true);
    });
    it('should compare neg match false correctly', function() {
      comparators
        .nmatches({ nextValue: 'beh', ruleValue: /^beh$/ })
        .should.equal(false);
    });
    it('should handle empty values when processing neg match', function() {
      comparators
        .nmatches({ nextValue: undefined, ruleValue: /^meh$/ })
        .should.equal(true);
    });
  });

  describe('Contains/NContains', function() {
    it('should compare contains true correctly', function() {
      comparators
        .contains({ nextValue: 'meh', ruleValue: 'eh' })
        .should.equal(true);
    });
    it('should compare contains false correctly', function() {
      comparators
        .contains({ nextValue: 'beh', ruleValue: 'meh' })
        .should.equal(false);
    });
    it('should handle empty values when processing contains', function() {
      comparators
        .contains({ nextValue: undefined, ruleValue: 'meh' })
        .should.equal(false);
    });
    it('should compare neg contains true correctly', function() {
      comparators
        .ncontains({ nextValue: 'meh', ruleValue: 'b' })
        .should.equal(true);
    });
    it('should compare neg contains false correctly', function() {
      comparators
        .ncontains({ nextValue: 'beh', ruleValue: 'eh' })
        .should.equal(false);
    });
    it('should handle empty values when processing neg contains', function() {
      comparators
        .ncontains({ nextValue: undefined, ruleValue: 'meh' })
        .should.equal(true);
    });
  });

  describe('DivisibleBy/NDivisibleBy', function() {
    it('should compare divisbleBy true correctly', function() {
      comparators
        .divisibleBy({ nextValue: 9, ruleValue: 3 })
        .should.equal(true);
    });
    it('should compare divisibleBy false correctly', function() {
      comparators
        .divisibleBy({ nextValue: 9, ruleValue: 4 })
        .should.equal(false);
    });
    it('should handle empty values when processing divisibleBy', function() {
      comparators
        .divisibleBy({ nextValue: undefined, ruleValue: 3 })
        .should.equal(false);
    });
    it('should compare ndivisbleBy true correctly', function() {
      comparators
        .ndivisibleBy({ nextValue: 9, ruleValue: 4 })
        .should.equal(true);
    });
    it('should compare ndivisibleBy false correctly', function() {
      comparators
        .ndivisibleBy({ nextValue: 9, ruleValue: 3 })
        .should.equal(false);
    });
    it('should handle empty values when processing ndivisibleBy', function() {
      comparators
        .ndivisibleBy({ nextValue: undefined, ruleValue: 3 })
        .should.equal(true);
    });
  });

  describe('Weighted/NWeighted', function() {
    it('should weighted true correctly', function() {
      comparators.weight({ nextValue: null, ruleValue: 1 }).should.equal(true);
    });
    it('should weighted false correctly', function() {
      comparators.weight({ nextValue: null, ruleValue: 0 }).should.equal(false);
    });
    it('should nweighted true correctly', function() {
      comparators.nweight({ nextValue: null, ruleValue: 0 }).should.equal(true);
    });
    it('should nweighted false correctly', function() {
      comparators
        .nweight({ nextValue: null, ruleValue: 1 })
        .should.equal(false);
    });
  });

  describe('Version comparisons', function() {
    it('should compare equal versions true correctly', function() {
      comparators
        .eqVersion({ nextValue: '1.11.0', ruleValue: '1.11.0' })
        .should.equal(true);
    });
    it('should compare equal versions false correctly', function() {
      comparators
        .eqVersion({ nextValue: '1.11.0', ruleValue: '1.11.1' })
        .should.equal(false);
    });
    it('should handle empty values when processing equal versions', function() {
      comparators
        .eqVersion({ nextValue: undefined, ruleValue: '1.11.0' })
        .should.equal(false);
    });
    it('should compare gt versions true correctly', function() {
      comparators
        .gtVersion({ nextValue: '1.2.0', ruleValue: '1.11.0' })
        .should.equal(true);
    });
    it('should compare gt versions false correctly', function() {
      comparators
        .gtVersion({ nextValue: '1.11.0', ruleValue: '1.2.0' })
        .should.equal(false);
    });
    it('should handle empty values when processing gt versions', function() {
      comparators
        .gtVersion({ nextValue: undefined, ruleValue: '1.11.0' })
        .should.equal(false);
    });
    it('should compare gte versions true correctly', function() {
      comparators
        .gteVersion({ nextValue: '1.2.0', ruleValue: '1.11.0' })
        .should.equal(true);
      comparators
        .gteVersion({ nextValue: '1.2.0', ruleValue: '1.2.0' })
        .should.equal(true);
    });
    it('should compare gte versions false correctly', function() {
      comparators
        .gteVersion({ nextValue: '1.11.0', ruleValue: '1.2.0' })
        .should.equal(false);
    });
    it('should handle empty values when processing gt versions', function() {
      comparators
        .gteVersion({ nextValue: undefined, ruleValue: '1.11.0' })
        .should.equal(false);
    });
    it('should compare lt versions true correctly', function() {
      comparators
        .ltVersion({ nextValue: '1.11.0', ruleValue: '1.2.0' })
        .should.equal(true);
    });
    it('should compare lt versions false correctly', function() {
      comparators
        .ltVersion({ nextValue: '1.2.0', ruleValue: '1.11.0' })
        .should.equal(false);
    });
    it('should handle empty values when processing gt versions', function() {
      comparators
        .ltVersion({ nextValue: undefined, ruleValue: '1.11.0' })
        .should.equal(false);
    });
    it('should compare lte versions true correctly', function() {
      comparators
        .lteVersion({ nextValue: '1.11.0', ruleValue: '1.2.0' })
        .should.equal(true);
      comparators
        .lteVersion({ nextValue: '1.2.0', ruleValue: '1.2.0' })
        .should.equal(true);
    });
    it('should compare lte versions false correctly', function() {
      comparators
        .lteVersion({ nextValue: '1.2.0', ruleValue: '1.11.0' })
        .should.equal(false);
    });
    it('should handle empty values when processing gt versions', function() {
      comparators
        .lteVersion({ nextValue: undefined, ruleValue: '1.11.0' })
        .should.equal(false);
    });
  });
});
