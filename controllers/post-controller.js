'use strict';

var Posts = require('../models/post-model');

var config = require('../config');
var env = process.NODE_ENV || 'development';


module.exports = {

	findAll: function (request, reply) {
		Post.find(null, null, function (err, posts) {
			if (err) {
				return reply(err);
			} else {
				return reply(post);
			}
		});
	}
};
