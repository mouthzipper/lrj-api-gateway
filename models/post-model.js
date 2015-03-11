'use strict';

var mongoose  = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({

	name: {
		type: String,
		unique: false
	},

	description: {
		type: String,
		unique: false
	},

	rank: {
		type: Number,
		default: -Infinity
	},

	upVotes: {
		type: Array,
		default: []
	},

	downVotes: {
		type: Array,
		default: []
	},

	author: {},

	comments: {
		type: Array,
		default: []
	},

	image: {
		type: String,
		default: ''
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	updatedAt: {
		type: Date,
		default: Date.now
	},

	deletedAt: Date

} );

module.exports = mongoose.model( 'Post', postSchema );
