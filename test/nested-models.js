var chai = require('chai'),
	expect = chai.expect,

	Serializer = require('../').Serializer,

	mocks = {
		models: require('./mock/models'),
	}
;

module.exports = function () {
	it('should exclude the \'__meta__\' field', function() {
		var userGroup = mocks.models.orig.userGroups[0],
			serialized = Serializer.serialize(userGroup)
		;

		expect(serialized).to.not.have.property('__meta__');
		expect(serialized.users[0]).to.not.have.property('__meta__');
		expect(serialized.users[1]).to.not.have.property('__meta__');
	})

	describe('if \'groups\' option is provided,', function() {
		var userGroup = mocks.models.orig.userGroups[1],
			serialized = Serializer.serialize(userGroup, {groups: ['defaults']}),
			userGroupFields = ['id', 'name', 'users'],
			userFields = ['id', 'name']
		;

		it('should expose recursively fields according to the provided groups', function () {
			userGroupFields.forEach(function(field) {
				expect(serialized, 'Field \''+field+'\' should be exposed')
					.to.have.property(field);
			});

			userFields.forEach(function(field) {
				expect(serialized.users[0], 'Field \''+field+'\' should be exposed')
					.to.have.property(field);
				expect(serialized.users[1], 'Field \''+field+'\' should be exposed')
					.to.have.property(field);
			});
		});
			
		it('should not expose other fields', function () {
			Object.keys(userGroup)
				.filter(function(field){return userGroupFields.indexOf(field) == -1})
				.forEach(function(field) {
					expect(serialized, 'Field \''+field+'\' should not be exposed')
						.to.not.have.property(field);
				})
			;

			Object.keys(userGroup.users[0])
				.filter(function(field){return userFields.indexOf(field) == -1})
				.forEach(function(field) {
					expect(serialized.users[0], 'Field \''+field+'\' should not be exposed')
						.to.not.have.property(field);
				})
			;

			Object.keys(userGroup.users[1])
				.filter(function(field){return userFields.indexOf(field) == -1})
				.forEach(function(field) {
					expect(serialized.users[1], 'Field \''+field+'\' should not be exposed')
						.to.not.have.property(field);
				})
			;
		})
	})
}