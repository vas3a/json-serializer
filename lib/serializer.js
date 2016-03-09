'use strict';

/**
 * deep parse the object and remove properties according to serializer meta
 */
var parse = function(object, opts)
{
	if(!opts.depth--){
		return null;
	}

	if(object == null || typeof object !== 'object') {
		return object;
	}

	var parsed = {}, keys = Object.keys(object);

	var objMeta = object.__meta__,
		serializerMeta = objMeta && objMeta.serializer,
		restrict = getExposed(serializerMeta, opts || {})
	;

	if(Array.isArray(object)){
		return object.map(function(obj){ return parse(obj, opts); });
	}

	if(keys.length) {
		keys
			.filter(function(key){
				return key !== '__meta__' && (!(restrict) || restrict.indexOf(key) > -1);
			})
			.forEach(function(key){
				return parsed[key] = parse(object[key], opts);
			})
		;
	}

	return parsed;
}

/**
 * default exclusion policy == none
 * if opts.fields is provided, those fields will be exposed, no matter the exclusion policy
 * if no opts.groupds is provided
 * 		and exclusion policy is none, will return no restrictions
 *   	and exclusion policy is all, will return either the exposed props or the defaults group
 * if no meta.groupds is provided nor an exclusion policy or an exclusion policy of none is provided,
 * 		no restriction will be returned
 * otherwise, expose the choosen groups
 */
var getExposed = function(meta, opts)
{
	meta = meta || {};

	if(opts.fields != null) {
		return opts.fields;
	}

	if(!opts.groups){
		if(!meta.exclusion || meta.exclusion == 'none') {
			return;
		}

		if(meta.exclusion == 'all') {
			if(meta.expose || (meta.groups && meta.groups.defaults)){
				return meta.expose || meta.groups.defaults;
			}
			return [];
		}
	}

	if(!meta.groups && (!meta.exclusion || meta.exclusion == 'none')) {
		return;
	}

	return Object.keys(meta.groups || [])
		.filter(function(group){
			return opts.groups.indexOf(group) > -1;
		})
		.reduce(function(p, c){
			return p.concat(meta.groups[c]);
		}, [])
	;
}

module.exports = {serialize: function(data, opts) {
	opts || (opts = {});
	opts.depth || (opts.depth = 20);
	if(!(data == null || typeof data !== 'object')) {
		data = JSON.parse(JSON.stringify(data));
	}
	
	return parse(data, opts);
}};