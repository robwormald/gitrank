/* */ 
"use strict";
var util = require("./util");
var isPrimitive = util.isPrimitive;
var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
module.exports = function(Promise) {
  var returner = function() {
    return this;
  };
  var thrower = function() {
    throw this;
  };
  var wrapper = function(value, action) {
    if (action === 1) {
      return function() {
        throw value;
      };
    } else if (action === 2) {
      return function() {
        return value;
      };
    }
  };
  Promise.prototype["return"] = Promise.prototype.thenReturn = function(value) {
    if (wrapsPrimitiveReceiver && isPrimitive(value)) {
      return this._then(wrapper(value, 2), undefined, undefined, undefined, undefined);
    }
    return this._then(returner, undefined, undefined, value, undefined);
  };
  Promise.prototype["throw"] = Promise.prototype.thenThrow = function(reason) {
    if (wrapsPrimitiveReceiver && isPrimitive(reason)) {
      return this._then(wrapper(reason, 1), undefined, undefined, undefined, undefined);
    }
    return this._then(thrower, undefined, undefined, reason, undefined);
  };
};
