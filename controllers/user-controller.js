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

function createToken( userId ) {
	return jwt.sign({ id_token: userId }, config[env].jwt.privateKey, { expiresInMinutes: 60 } );
}

module.exports = {
	create: function (request, reply) {
		request.payload.name = {
			first: request.payload.firstName,
			last: request.payload.lastName
		};
		User.findOne( { email : request.payload.email }, 'email', function ( err, existingUser ) {
			if( existingUser ) {
				reply.Boom( { message: 'Email is already taken.' } );
			}
			User.create(request.payload, function (err, user) {
				if (err) {
					return reply(err);
				} else {
					var baseUrl = request.server.info.uri;
					var path = request.path;
					var token = createToken( user._id );

					return reply( { token : token, user : user } );
				}
			});
		} );
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

		User.findOne({ email: credentials.email }, 'password username', function (err, user) {
			if (err) {
				return reply({ message: { email: 'Incorrect email' } }).code( 401 );
			}
			if (user) {
				user.verifyPassword(credentials.password, function (err, response) {
					if (err || response === false ) {
						return reply({ message: { password: 'Incorrect password' } }).code( 401 );
					}
					if( response === true ) {
						user = user.toObject();
						delete user.password;
						// generate JWT
						var token = createToken( user._id );

						return reply( { token : token, user: user } );
					} 
				});
			} else {
				return reply({ message: { email: 'Incorrect email' } }).code( 401 );
			}
		});
	}
};
