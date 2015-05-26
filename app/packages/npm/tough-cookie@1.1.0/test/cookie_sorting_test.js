/* */ 
'use strict';
var vows = require("vows");
var assert = require("assert");
var tough = require("../lib/cookie");
var Cookie = tough.Cookie;
function toKeyArray(cookies) {
  return cookies.map(function(c) {
    return c.key;
  });
}
vows.describe('Cookie sorting').addBatch({"Cookie Sorting": {
    topic: function() {
      var cookies = [];
      cookies.push(Cookie.parse("a=0; Domain=example.com"));
      cookies.push(Cookie.parse("b=1; Domain=www.example.com"));
      cookies.push(Cookie.parse("c=2; Domain=example.com; Path=/pathA"));
      cookies.push(Cookie.parse("d=3; Domain=www.example.com; Path=/pathA"));
      cookies.push(Cookie.parse("e=4; Domain=example.com; Path=/pathA/pathB"));
      cookies.push(Cookie.parse("f=5; Domain=www.example.com; Path=/pathA/pathB"));
      cookies = cookies.sort(function() {
        return Math.random() - 0.5;
      });
      cookies = cookies.sort(tough.cookieCompare);
      return cookies;
    },
    "got": function(cookies) {
      assert.lengthOf(cookies, 6);
      assert.deepEqual(toKeyArray(cookies), ['e', 'f', 'c', 'd', 'a', 'b']);
    }
  }}).addBatch({"Changing creation date affects sorting": {
    topic: function() {
      var cookies = [];
      var now = Date.now();
      cookies.push(Cookie.parse("a=0;"));
      cookies.push(Cookie.parse("b=1;"));
      cookies.push(Cookie.parse("c=2;"));
      cookies.forEach(function(cookie, idx) {
        cookie.creation = new Date(now - 100 * idx);
      });
      return cookies.sort(tough.cookieCompare);
    },
    "got": function(cookies) {
      assert.deepEqual(toKeyArray(cookies), ['c', 'b', 'a']);
    }
  }}).export(module);
