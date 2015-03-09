'use strict';

var mongoose = require('mongoose');
var validator = require('validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		first: String,
		last: String
	},

	username: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true,
		validate: [validator.isEmail]
	},

	emailVerified: {
		type: Boolean,
		default: false
	},

	verificationToken: String,

	status: String,

	createdAt: {
		type: Date,
		default: Date.now
	},

	updatedAt: {
		type: Date,
		default: Date.now
	},

	deletedAt: Date
});

userSchema.virtual('name.full').get(function () {
	return this.name.first + ' ' + this.name.last;
});

userSchema.virtual('name.full').set(function (name) {
	var splitName = name.split(' ');
	this.name.first = splitName[0];
	this.name.first = splitName[1];
});

module.exports = mongoose.model('User', userSchema);
