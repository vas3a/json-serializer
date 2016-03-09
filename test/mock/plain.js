exports.orig = {
	natives: {
		string: '123',
		number: 0,
		null: null,
		undefined: undefined,
	},
	arrays: {
		empty: [],
		single: [1],
		natives: [1, 'asd', null, undefined],
		objects: [
			{prop1: 1, prop2: '2', prop3: null, prop4: undefined, prop5: [], prop6: {}},
			{prop1: 1, prop2: '2', prop3: null, prop4: undefined, prop5: [], prop6: {}}
			[
				{prop1: 1, prop2: '2', prop3: null, prop4: undefined, prop5: [], prop6: {}},
				{prop1: 1, prop2: '2', prop3: null, prop4: undefined, prop5: [], prop6: {}}
			]
		]
	},
	nested: {
		prop1: 1, prop2: '2', prop3: null, prop4: undefined, prop5: [], prop6: {
			prop1: 1, prop2: '2', prop3: null, prop4: undefined, prop5: [], prop6: {
				prop1: 1, prop2: '2', prop3: null, prop4: undefined, prop5: [], prop6: {},
			},
		},
	},
};

exports.expect = exports.orig;