/* */ 
"format cjs";
"use strict";

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

var IgnoreFormatter = (function () {
  function IgnoreFormatter() {
    _classCallCheck(this, IgnoreFormatter);
  }

  IgnoreFormatter.prototype.exportDeclaration = function exportDeclaration(node, nodes) {
    var declar = t.toStatement(node.declaration, true);
    if (declar) nodes.push(t.inherits(declar, node));
  };

  IgnoreFormatter.prototype.exportAllDeclaration = function exportAllDeclaration() {};

  IgnoreFormatter.prototype.importDeclaration = function importDeclaration() {};

  IgnoreFormatter.prototype.importSpecifier = function importSpecifier() {};

  IgnoreFormatter.prototype.exportSpecifier = function exportSpecifier() {};

  return IgnoreFormatter;
})();

exports["default"] = IgnoreFormatter;
module.exports = exports["default"];