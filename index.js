'use strict';

var Hapi = require('hapi');
var config = require('./config');

var env = process.NODE_ENV || 'development';

var server = new Hapi.Server();
server.connection({
	port: config[env].api.port
});

// Register all plugins
var plugins = [];
var pluginOptions = {};

server.register(plugins, pluginOptions, function (error) {
	if (error) {
		throw error;
	} else {
		// Start the server
		server.start(function() {
			console.log('Server running at:', server.info.uri);
		});
	}
});
