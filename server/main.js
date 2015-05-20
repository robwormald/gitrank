//server main entry point
console.log('hello server...');

//dependencies (commonJS)
let express = require('express');
let request = require('request');

//config constants
const SERVER_PORT = process.env.port || 1337;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_ID;
