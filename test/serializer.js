'use strict';

var chai = require('chai'),
	expect = chai.expect,

	Serializer = require('../').Serializer,

	mocks = {
		plain: require('./mock/plain'),
		models: require('./mock/models'),
	},

	plainModelTest = require('./plain-model'),
	nestedModelsTest = require('./nested-models')
;


var simple

describe('Serializer', function() {
	it('should not modify natives', function() {
		var orig = mocks.plain.orig;
		Object.keys(orig.natives).forEach(function(key) {
			expect(Serializer.serialize(orig.natives[key])).to.equal(orig.natives[key]);
		});
	})

	describe('on simple model', function() {
		plainModelTest();
	})

	describe('on nested models', function() {
		nestedModelsTest();
	})
});