'use strict';

var postCtrl = require( '../controllers/post-controller' );

// Post Routes
// -----------
module.exports = [
	{
		method: 'GET',
		path: '/posts',
		config: {
			auth: false,
			description: 'Find all available posts',
			notes: 'Returns the array of posts',
			tags: ['api', 'posts', 'findall'],

			handler: postCtrl.findAll.bind( postCtrl )
		}
	}
];