'use strict';

var Post = require('../models/post-model');

var config = require('../config');
var env = process.NODE_ENV || 'development';


module.exports = {

	create: function (request, reply) {
		Post.create(request.payload, function (err, post) {
			if (err) {
				return reply(err);
			} else {
				var baseUrl = request.server.info.uri;
				var path = request.path;

				return reply( { post : post } );
			}
		});
	},
	findAll: function (request, reply) {
		Post.find(null, null, function (err, posts) {
			if (err) {
				return reply(err);
			} else {
				return reply(posts);
			}
		});
	}
};
