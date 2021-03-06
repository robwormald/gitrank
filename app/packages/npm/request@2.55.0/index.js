/* */ 
'use strict';
var extend = require("util")._extend,
    cookies = require("./lib/cookies"),
    helpers = require("./lib/helpers");
var isFunction = helpers.isFunction,
    paramsHaveRequestBody = helpers.paramsHaveRequestBody;
function initParams(uri, options, callback) {
  if (typeof options === 'function') {
    callback = options;
  }
  var params = {};
  if (typeof options === 'object') {
    params = extend({}, options);
    params = extend(params, {uri: uri});
  } else if (typeof uri === 'string') {
    params = extend({}, {uri: uri});
  } else {
    params = extend({}, uri);
  }
  params.callback = callback;
  return params;
}
function request(uri, options, callback) {
  if (typeof uri === 'undefined') {
    throw new Error('undefined is not a valid uri or options object.');
  }
  var params = initParams(uri, options, callback);
  if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {
    throw new Error('HTTP HEAD requests MUST NOT include a request body.');
  }
  return new request.Request(params);
}
var verbs = ['get', 'head', 'post', 'put', 'patch', 'del'];
verbs.forEach(function(verb) {
  var method = verb === 'del' ? 'DELETE' : verb.toUpperCase();
  request[verb] = function(uri, options, callback) {
    var params = initParams(uri, options, callback);
    params.method = method;
    return request(params, params.callback);
  };
});
request.jar = function(store) {
  return cookies.jar(store);
};
request.cookie = function(str) {
  return cookies.parse(str);
};
function wrapRequestMethod(method, options, requester) {
  return function(uri, opts, callback) {
    var params = initParams(uri, opts, callback);
    var headerlessOptions = extend({}, options);
    delete headerlessOptions.headers;
    params = extend(headerlessOptions, params);
    if (options.headers) {
      var headers = extend({}, options.headers);
      params.headers = extend(headers, params.headers);
    }
    if (typeof method === 'string') {
      params.method = (method === 'del' ? 'DELETE' : method.toUpperCase());
      method = request[method];
    }
    if (isFunction(requester)) {
      method = requester;
    }
    return method(params, params.callback);
  };
}
request.defaults = function(options, requester) {
  var self = this;
  if (typeof options === 'function') {
    requester = options;
    options = {};
  }
  var defaults = wrapRequestMethod(self, options, requester);
  var verbs = ['get', 'head', 'post', 'put', 'patch', 'del'];
  verbs.forEach(function(verb) {
    defaults[verb] = wrapRequestMethod(verb, options, requester);
  });
  defaults.cookie = wrapRequestMethod(self.cookie, options, requester);
  defaults.jar = self.jar;
  defaults.defaults = self.defaults;
  return defaults;
};
request.forever = function(agentOptions, optionsArg) {
  var options = {};
  if (optionsArg) {
    options = extend({}, optionsArg);
  }
  if (agentOptions) {
    options.agentOptions = agentOptions;
  }
  options.forever = true;
  return request.defaults(options);
};
module.exports = request;
request.Request = require("./request");
request.initParams = initParams;
Object.defineProperty(request, 'debug', {
  enumerable: true,
  get: function() {
    return request.Request.debug;
  },
  set: function(debug) {
    request.Request.debug = debug;
  }
});
