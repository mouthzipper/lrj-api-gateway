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
		default: 0
	},

	upVotes: {
		type: Number,
		default: 0
	},

	downVotes: {
		type: Number,
		default: 0
	},

	author: {
		type : String,
		default : 'Anonymous'
	},

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
