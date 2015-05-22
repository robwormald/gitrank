/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var GitHubAuth = require('../services/GitHubAuth')
module.exports = {
	//
	authenticate: GitHubAuth.authenticate,
	authenticateCallback: GitHubAuth.authenticateCallback
};
