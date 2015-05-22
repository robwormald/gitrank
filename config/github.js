module.exports.github = {
  authenticate_uri: 'https://github.com/login/oauth/authorize',
  redirect_uri: 'http://localhost:1337/github/authenticate/callback',
  token_uri: 'https://github.com/login/oauth/access_token',
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  scope: 'read:org,user'
}
