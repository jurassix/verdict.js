var should = require('should');
var comparators = require('../lib/comparison');

/*global it*/
/*global describe*/

describe('Comparison test', function() {
  describe('Equals/Nequals', function() {
    it('should compare equals correctly, number same type', function() {
      comparators.eq(1, 1).should.equal(true);
    });
    it.skip(
      'should compare equals correctly, number different types',
      function() {
        comparators.eq(1, '1').should.equal(true);
      }
    );
    it('should compare equals to be false correctly', function() {
      comparators.eq('one string', 'two string').should.equal(false);
    });
    it('should handle empty values when processing equals', function() {
      comparators.eq(undefined, 1).should.equal(false);
    });
    it('should compare not equals correctly, number same type', function() {
      comparators.neq(1, 2).should.equal(true);
    });
    it.skip('should compare not equals to be false correctly', function() {
      comparators.neq('1', 1).should.equal(false);
    });
    it('should handle empty values when processing not equals', function() {
      comparators.neq(undefined, 1).should.equal(true);
    });
  });

  describe('Identity/Negative Identity', function() {
    it('should compare identity true correctly', function() {
      comparators.is(1, 1).should.equal(true);
    });
    it('should compare identity false correctly, values', function() {
      comparators.is(1, 2).should.equal(false);
    });
    it('should compare identity false correctly, types', function() {
      comparators.is(1, '1').should.equal(false);
    });
    it('should handle empty values when processing identity', function() {
      comparators.is(undefined, 1).should.equal(false);
    });
    it('should compare negative identity true correctly', function() {
      comparators.not(1, 2).should.equal(true);
    });
    it('should compare negative identity false correctly, values', function() {
      comparators.not(1, 1).should.equal(false);
    });
    it('should handle empty values for negative identity', function() {
      comparators.not(undefined, 1).should.equal(true);
    });
  });

  describe('GT/LT/GTE/LTE', function() {
    it('should compare gt true correctly', function() {
      comparators.gt(1, 0).should.equal(true);
    });
    it('should compare gt false correctly', function() {
      comparators.gt(0, 1).should.equal(false);
    });
    it('should handle empty values when processing gt', function() {
      comparators.gt(undefined, 1).should.equal(false);
    });
    it('should compare gte true correctly', function() {
      comparators.gte(1, 0).should.equal(true);
    });
    it('should compare gte false correctly', function() {
      comparators.gte(0, 1).should.equal(false);
    });
    it('should handle empty values when processing gte', function() {
      comparators.gte(undefined, 1).should.equal(false);
    });
    it('should compare lt true correctly', function() {
      comparators.lt(0, 1).should.equal(true);
    });
    it('should compare lt false correctly', function() {
      comparators.lt(1, 0).should.equal(false);
    });
    it('should handle empty values when processing lt', function() {
      comparators.lt(undefined, 1).should.equal(false);
    });
    it('should compare lte true correctly', function() {
      comparators.lte(0, 1).should.equal(true);
    });
    it('should compare lte false correctly', function() {
      comparators.lte(1, 0).should.equal(false);
    });
    it('should handle empty values when processing lte', function() {
      comparators.lte(undefined, 1).should.equal(false);
    });
  });

  describe('Range/Negative Range', function() {
    it('should compare range true correctly', function() {
      comparators.inRange(3, [0, 4]).should.equal(true);
    });
    it('should compare range false correctly', function() {
      comparators.inRange(5, [0, 4]).should.equal(false);
    });
    it('should handle empty values when processing range', function() {
      comparators.inRange(undefined, [0, 4]).should.equal(false);
    });
    it('should compare neg range true correctly', function() {
      comparators.ninRange(3, [4, 6]).should.equal(true);
    });
    it('should compare neg range false correctly', function() {
      comparators.ninRange(3, [0, 4]).should.equal(false);
    });
    it('should handle empty values when processing neg range', function() {
      comparators.ninRange(undefined, [0, 4]).should.equal(false);
    });
  });

  describe('Compiler', function() {
    it('should compare compile true correctly', function() {
      comparators.compile(null, '1 == 1').should.equal(true);
    });
    it('should compare compile false correctly', function() {
      comparators.compile(null, '1 == 2').should.equal(false);
    });
  });

  describe('RegEx/Negative RegEx', function() {
    it('should compare match true correctly', function() {
      comparators.matches('meh', /^meh$/).should.equal(true);
    });
    it('should compare match false correctly', function() {
      comparators.matches('beh', /merf/).should.equal(false);
    });
    it('should handle empty values when processing match', function() {
      comparators.matches(undefined, /^meh$/).should.equal(false);
    });
    it('should compare neg match true correctly', function() {
      comparators.nmatches('meh', /merf/).should.equal(true);
    });
    it('should compare neg match false correctly', function() {
      comparators.nmatches('beh', /^beh$/).should.equal(false);
    });
    it('should handle empty values when processing neg match', function() {
      comparators.nmatches(undefined, /^meh$/).should.equal(true);
    });
  });

  describe('Contains/NContains', function() {
    it('should compare contains true correctly', function() {
      comparators.contains('meh', 'eh').should.equal(true);
    });
    it('should compare contains false correctly', function() {
      comparators.contains('beh', 'meh').should.equal(false);
    });
    it('should handle empty values when processing contains', function() {
      comparators.contains(undefined, 'meh').should.equal(false);
    });
    it('should compare neg contains true correctly', function() {
      comparators.ncontains('meh', 'b').should.equal(true);
    });
    it('should compare neg contains false correctly', function() {
      comparators.ncontains('beh', 'eh').should.equal(false);
    });
    it('should handle empty values when processing neg contains', function() {
      comparators.ncontains(undefined, 'meh').should.equal(true);
    });
  });

  describe('DivisibleBy/NDivisibleBy', function() {
    it('should compare divisbleBy true correctly', function() {
      comparators.divisibleBy(9, 3).should.equal(true);
    });
    it('should compare divisibleBy false correctly', function() {
      comparators.divisibleBy(9, 4).should.equal(false);
    });
    it('should handle empty values when processing divisibleBy', function() {
      comparators.divisibleBy(undefined, 3).should.equal(false);
    });
    it('should compare ndivisbleBy true correctly', function() {
      comparators.ndivisibleBy(9, 4).should.equal(true);
    });
    it('should compare ndivisibleBy false correctly', function() {
      comparators.ndivisibleBy(9, 3).should.equal(false);
    });
    it('should handle empty values when processing ndivisibleBy', function() {
      comparators.ndivisibleBy(undefined, 3).should.equal(true);
    });
  });

  describe('Weighted/NWeighted', function() {
    it('should weighted true correctly', function() {
      comparators.weight(null, 1).should.equal(true);
    });
    it('should weighted false correctly', function() {
      comparators.weight(null, 0).should.equal(false);
    });
    it('should nweighted true correctly', function() {
      comparators.nweight(null, 0).should.equal(true);
    });
    it('should nweighted false correctly', function() {
      comparators.nweight(null, 1).should.equal(false);
    });
  });

  describe('Version comparisons', function() {
    it('should compare equal versions true correctly', function() {
      comparators.eqVersion('1.11.0', '1.11.0').should.equal(true);
    });
    it('should compare equal versions false correctly', function() {
      comparators.eqVersion('1.11.0', '1.11.1').should.equal(false);
    });
    it('should handle empty values when processing equal versions', function() {
      comparators.eqVersion(undefined, '1.11.0').should.equal(false);
    });
    it('should compare gt versions true correctly', function() {
      comparators.gtVersion('1.2.0', '1.11.0').should.equal(true);
    });
    it('should compare gt versions false correctly', function() {
      comparators.gtVersion('1.11.0', '1.2.0').should.equal(false);
    });
    it('should handle empty values when processing gt versions', function() {
      comparators.gtVersion(undefined, '1.11.0').should.equal(false);
    });
    it('should compare gte versions true correctly', function() {
      comparators.gteVersion('1.2.0', '1.11.0').should.equal(true);
      comparators.gteVersion('1.2.0', '1.2.0').should.equal(true);
    });
    it('should compare gte versions false correctly', function() {
      comparators.gteVersion('1.11.0', '1.2.0').should.equal(false);
    });
    it('should handle empty values when processing gt versions', function() {
      comparators.gteVersion(undefined, '1.11.0').should.equal(false);
    });
    it('should compare lt versions true correctly', function() {
      comparators.ltVersion('1.11.0', '1.2.0').should.equal(true);
    });
    it('should compare lt versions false correctly', function() {
      comparators.ltVersion('1.2.0', '1.11.0').should.equal(false);
    });
    it('should handle empty values when processing gt versions', function() {
      comparators.ltVersion(undefined, '1.11.0').should.equal(false);
    });
    it('should compare lte versions true correctly', function() {
      comparators.lteVersion('1.11.0', '1.2.0').should.equal(true);
      comparators.lteVersion('1.2.0', '1.2.0').should.equal(true);
    });
    it('should compare lte versions false correctly', function() {
      comparators.lteVersion('1.2.0', '1.11.0').should.equal(false);
    });
    it('should handle empty values when processing gt versions', function() {
      comparators.lteVersion(undefined, '1.11.0').should.equal(false);
    });
  });
});
