'use strict';

var Boom = require('boom');
var jwt = require('jsonwebtoken');
var User = require('../models/user-model');

var config = require('../config');
var env = process.NODE_ENV || 'development';

function normalizeCredentials (credentials) {
	var query = {};

	if (credentials.email) {
		query.email = credentials.email;
	} else if (credentials.username) {
		query.username = credentials.username;
	}

	return query;
}

module.exports = {
	create: function (request, reply) {
		request.payload.name = {
			first: request.payload.firstName,
			last: request.payload.lastName
		};

		User.create(request.payload, function (err, user) {
			if (err) {
				return reply(err);
			} else {
				var baseUrl = request.server.info.uri;
				var path = request.path;

				return reply().created( baseUrl + path + '/' + user._id );
			}
		});
	},

	findAll: function (request, reply) {
		User.find(null, 'name username email', null, function (err, users) {
			if (err) {
				return reply(err);
			} else {
				return reply(users);
			}
		});
	},

	findById: function (request, reply) {
		User.findOne({_id: request.params.id}, 'name username email', function (err, user) {
			if (err) {
				return reply(err);
			} else {
				return reply(user);
			}
		});
	},

	login: function (request, reply) {
		var credentials = request.payload;
		var query = normalizeCredentials(credentials);

		if ( !query.email && !query.username ) {
			return reply(Boom.badRequest('username or email is required'));
		}

		User.findOne(query, 'password username', function (err, user) {
			if (err) {
				return reply(err);
			}

			if (user) {
				user.verifyPassword(credentials.password, function (err, response) {
					if (err) {
						return reply(err);
					}

					if ( response === true ) {
						user = user.toObject();
						delete user.password;
						// generate JWT
						var token = jwt.sign({id_token: user._id}, config[env].jwt.privateKey, {
							expiresInMinutes: 60
						});

						return reply( { token : token, user: user } );
					} else {
						return reply(Boom.unauthorized('login failed'));
					}
				});
			} else {
					return reply(Boom.unauthorized('login failed'));
			}
		});
	}
};
