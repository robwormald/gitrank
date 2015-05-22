var request = require('request');

function getAuthUrl(){
  var params = '?client_id=' + sails.config.github.client_id +
  '&redirect_uri=' + sails.config.github.redirect_uri +
  '&scope=' + sails.config.github.scope;

  return sails.config.github.authenticate_uri + params;
}

function exchangeCodeForTokens(code, callback){
  request.post(sails.config.github.token_uri, {
    body: {
      client_id: sails.config.github.client_id,
      client_secret: sails.config.github.client_secret,
      code: code
    },
    json: true
  },parseTokenResponse(callback));
}

function parseTokenResponse(complete){
  return function(err, response, data){
    complete(err, data.access_token);
  }
}


module.exports = {
  authenticateCallback: function(req,res){
    if(req.query.code){
      exchangeCodeForTokens(req.query.code, function(err,token){
        if(!err){
          res.redirect('/#?github_token='+token);
        }
      });
    }
    else {
      res.badRequest();
    }
  },
  authenticate: function(req,res){
    res.redirect(getAuthUrl());
  }
}
