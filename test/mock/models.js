var users = [{
	__meta__: {},
	id: 0,
	name: 'Name here',
	age: 21,
	meta: {
		lastseen: 1457526725735,
		registered: 1457526725735,
	},
	email: 'some@email.dot',
	some: [{'1': 'peer', '2': 'pair'}]
}, {
	__meta__: {
		serializer: {
			groups: {
				defaults: ['id', 'name'],
				details: ['id', 'name', 'age', 'email'],
				all: ['meta', 'some'],
			},
		}
	},
	id: 1,
	name: 'Name here',
	age: 21,
	meta: {
		lastseen: 1457526725735,
		registered: 1457526725735,
	},
	email: 'some@email.dot',
	some: [{'1': 'peer', '2': 'pair'}]
}, {
	__meta__: {
		serializer: {
			exclusion: 'none',
			groups: {
				defaults: ['id', 'name'],
				details: ['id', 'name', 'age', 'email'],
				all: ['meta', 'some'],
			},
		}
	},
	id: 2,
	name: 'Name here',
	age: 21,
	meta: {
		lastseen: 1457526725735,
		registered: 1457526725735,
	},
	email: 'some@email.dot',
	some: [{'1': 'peer', '2': 'pair'}]
}, {
	__meta__: {
		serializer: {
			exclusion: 'all',
			groups: {
				defaults: ['id', 'name'],
				details: ['id', 'name', 'age', 'email'],
				all: ['meta', 'some'],
			},
		}
	},
	id: 3,
	name: 'Name here',
	age: 21,
	meta: {
		lastseen: 1457526725735,
		registered: 1457526725735,
	},
	email: 'some@email.dot',
	some: [{'1': 'peer', '2': 'pair'}]
}, {
	__meta__: {
		serializer: {
			exclusion: 'all',
			expose: ['id', 'name', 'age'],
			groups: {
				defaults: ['id', 'name'],
				details: ['id', 'name', 'age', 'email'],
				all: ['meta', 'some'],
			},
		}
	},
	id: 4,
	name: 'Name here',
	age: 21,
	meta: {
		lastseen: 1457526725735,
		registered: 1457526725735,
	},
	email: 'some@email.dot',
	some: [{'1': 'peer', '2': 'pair'}]
}];

var userGroups = [{
	__meta__: {},
	id: 0,
	users: [users[0], users[1]],
	name: 'group 1',
	description: 'plain'
}, {
	__meta__: {
		serializer: {
			exclusion: 'all',
			groups: {
				defaults: ['id', 'name', 'users'],
				details: ['id', 'name', 'users', 'description']
			},
		}
	},
	id: 0,
	users: [users[1], users[2]],
	name: 'group 1',
	description: 'plain'
}];

exports.orig = {users: users, userGroups: userGroups}
exports.expect = exports.orig;