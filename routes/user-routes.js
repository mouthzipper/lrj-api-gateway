'use strict';

var Joi = require('joi');
var userCtrl = require('../controllers/user-controller');

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

			handler: userCtrl.create.bind(userCtrl)
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

			handler: userCtrl.findAll.bind(userCtrl)
		}
	},

	{
		method: 'POST',
		path: '/users/login',
		config: {
			auth: false,
			cors: true,
			description: 'Log in the specified user',
			notes: 'Returns',
			tags: ['api', 'user', 'login'],
			validate: {
				payload: {
					username: Joi.string().description('The username of the user').required(),
					password: Joi.string().description('The password of the user').required()
				}
			},
			handler: userCtrl.login.bind(userCtrl)
		}
	}
];
