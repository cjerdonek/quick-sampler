'use strict';

describe('services module', function() {

  beforeEach(module('freeSamplerApp.services'));

  describe('sha256', function() {
    var sha256;

    beforeEach(inject(function(_sha256_) {
      sha256 = _sha256_;
    }));

    it('should hash a string correctly', function() {
      expect(sha256('foo'))
        .toBe('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
    });

  });

  describe('getSample', function() {
    var getSample;

    beforeEach(inject(function(_getSample_) {
      getSample = _getSample_;
    }));

    it('should sample 1 item from 1000 items correctly', function() {
      expect(getSample('0', 1000, 1)).toBe(905);
    });

  });

  describe('getSamples', function() {
    var getSamples;

    beforeEach(inject(function(_getSamples_) {
      getSamples = _getSamples_;
    }));

    it('should sample 3 items from 1000 correctly', function() {
      expect(getSamples('abcde', 1000, 3))
        .toEqual([247, 427, 157]);
    });

  });

  describe('rivest-sampler-tests', function() {
    var getSamples, tests;

    beforeEach(inject(function($window, _getSamples_) {
      var json;
      getSamples = _getSamples_;
      json = $window.__html__['bower_components/rivest-sampler-tests/tests.json'];
      tests = angular.fromJson(json);
    }));

    it('should have JSON test cases', function() {
      expect(tests.length).toBeGreaterThan(0);
    });

    it('should pass its JSON test cases', function() {
      var test, testData;
      for (var i = 0,  len = tests.length; i < len; i++) {
        test = tests[i];
        testData = test.data;

        expect(getSamples(testData.seed, testData.total, testData.count))
          .toEqual(test.expected);
      }

    });

  });

});
