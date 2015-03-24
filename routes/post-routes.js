'use strict';
var Joi = require('joi');
var postCtrl = require('../controllers/post-controller');

// Post Routes
// -----------
module.exports = [
	{
		method: 'POST',

		path: '/posts',

		config: {
			auth: false,
			description: 'Add post instance and persist to data source',
			notes: 'Returns the location of the created post in the response headers',
			tags: ['api', 'post', 'create'],
			validate: {
				payload: {
					name: Joi.string().description('The name of the post'),
					description: Joi.string().description('The description of the post' ),
					image: Joi.string().description('The image path')
				}
			},

			handler: postCtrl.create.bind(postCtrl)
		}
	},
	{
		method: 'GET',

		path: '/posts',

		config: {
			auth: false,
			description: 'Find all posts[ maybe available all friends posts only ?]',
			notes: 'Returns all the posts//initial',
			tags: ['api', 'posts', 'get'],

			handler: postCtrl.findAll.bind(postCtrl)
		}
	}
];
