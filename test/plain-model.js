var chai = require('chai'),
	expect = chai.expect,

	Serializer = require('../').Serializer,

	mocks = {
		plain: require('./mock/plain'),
		models: require('./mock/models'),
	}
;

var groupExpectations = function(user, serialized, groupFields) {
	it('should expose the group fields', function() {
		groupFields.forEach(function(field) {
			expect(serialized, 'Field \''+field+'\' should be exposed')
				.to.have.property(field);
		});
	})
	
	it('should not expose other fields', function() {
		Object.keys(user)
			.filter(function(field){return groupFields.indexOf(field) == -1})
			.forEach(function(field) {
				expect(serialized, 'Field \''+field+'\' should not be exposed')
					.to.not.have.property(field);
			})
		;
	})
};

module.exports = function() {

	it('should exclude the \'__meta__\' field', function() {
		var user = mocks.models.orig.users[0],
			serialized = Serializer.serialize(user)
		;

		expect(serialized).to.not.have.property('__meta__');
	})

	describe('on no exclusion policy provided,', function() {
		describe('if no option is provided,', function() {
			it('should expose everything', function() {
				var user = mocks.models.orig.users[0],
					serialized = Serializer.serialize(user)
				;

				Object.keys(user)
					.filter(function(key){return key !== '__meta__' })
					.forEach(function(field) {
						expect(serialized, 'Field \''+field+'\' should be exposed')
							.to.have.property(field);
					})
				;
			})
		})

		describe('if \'fields\' option is provided,', function() {
			var user = mocks.models.orig.users[0],
				fields = ['id', 'name', 'age'],
				serialized = Serializer.serialize(user, {fields: fields})
			;
			groupExpectations(user, serialized, fields);
		})

		describe('if \'groups\' option is provided,', function() {
			var user = mocks.models.orig.users[1];

			describe('and provided group is \'details\',', function() {
				var serialized = Serializer.serialize(user, {groups: ['details']}),
					groupFields = ['id', 'name', 'age', 'email']
				;

				groupExpectations(user, serialized, groupFields);
			})
		})
	})

	describe('on exclusion policy provided as \'none\',', function() {
		describe('if no option is provided,', function() {
			it('should expose everything', function() {
				var user = mocks.models.orig.users[2],
					serialized = Serializer.serialize(user)
				;

				Object.keys(user)
					.filter(function(key){return key !== '__meta__' })
					.forEach(function(field) {
						expect(serialized, 'Field \''+field+'\' should be exposed')
							.to.have.property(field);
					})
				;
			})
		})

		describe('if \'fields\' option is provided,', function() {
			var user = mocks.models.orig.users[2],
				fields = ['id', 'name', 'age'],
				serialized = Serializer.serialize(user, {fields: fields})
			;
			groupExpectations(user, serialized, fields);
		})

		describe('if \'groups\' option is provided,', function() {
			var user = mocks.models.orig.users[2];

			describe('and provided group is \'details\',', function() {
				var serialized = Serializer.serialize(user, {groups: ['details']}),
					groupFields = ['id', 'name', 'age', 'email']
				;

				groupExpectations(user, serialized, groupFields);
			})
		})
	})

	describe('on exclusion policy provided as \'all\',', function() {
		describe('if no option is provided,', function() {
			describe('the \'defaults\' group exists in object\'s meta, ', function() {
				var user = mocks.models.orig.users[3];
				var serialized = Serializer.serialize(user),
					groupFields = ['id', 'name']
				;

				groupExpectations(user, serialized, groupFields);
			})

			describe('there are \'expose\' properties in object\'s meta, ', function() {
				var user = mocks.models.orig.users[4];
				var serialized = Serializer.serialize(user),
					exposedFields = ['id', 'name', 'age']
				;

				it('should expose the \'expose\' fields', function() {
					exposedFields.forEach(function(field) {
						expect(serialized, 'Field \''+field+'\' should be exposed')
							.to.have.property(field);
					});
				})
				
				it('should not expose other fields', function() {
					Object.keys(user)
						.filter(function(field){return exposedFields.indexOf(field) == -1})
						.forEach(function(field) {
							expect(serialized, 'Field \''+field+'\' should not be exposed')
								.to.not.have.property(field);
						})
					;
				})
			})
		})

		describe('if \'fields\' option is provided,', function() {
			var user = mocks.models.orig.users[3],
				fields = ['id', 'name', 'age'],
				serialized = Serializer.serialize(user, {fields: fields})
			;
			groupExpectations(user, serialized, fields);
		})

		describe('if \'groups\' option is provided,', function() {
			var user = mocks.models.orig.users[3];

			describe('and provided group is \'details\',', function() {
				var serialized = Serializer.serialize(user, {groups: ['details']}),
					groupFields = ['id', 'name', 'age', 'email']
				;
				groupExpectations(user, serialized, groupFields);
			})
		})
	})
};