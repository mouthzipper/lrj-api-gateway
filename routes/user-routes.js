'use strict';

var Joi = require('joi');
var User = require('../models/user-model');

// User Routes
// -----------
module.exports = [
	{
		method: 'POST',

		path: '/users',

		config: {
			auth: false,
			description: 'Add user instance and persist to data source',
			notes: 'Returns the location of the created user in the response headers',
			tags: ['api', 'user', 'create'],
			validate: {
				payload: {
					firstName: Joi.string().description('The first name of the user'),
					lastName: Joi.string().description('The last name of the user'),
					username: Joi.string().description('The username of the user').required(),
					password: Joi.string().description('The password of the user').required(),
					email: Joi.string().description('The email of the user').required()
				}
			},

			handler: function (request, reply) {
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
			}
		}
	},

	{
		method: 'GET',

		path: '/users',

		config: {
			auth: false,
			description: 'Find matching instances of users that match specified filter',
			notes: 'Returns the array of users that matched the specified filter',
			tags: ['api', 'user', 'find'],

			handler: function (request, reply) {
				User.find(null, 'name username email', null, function (err, users) {
					if (err) {
						return reply(err);
					} else {
						return reply(users);
					}
				});
			}
		}
	}
];
