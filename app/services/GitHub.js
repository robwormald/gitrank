const GITHUB_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN_KEY = 'github_token';

//models

class GitHubRepo {
  constructor(gitHubAPI, data){
    this._api = gitHubAPI;
    Object.assign(this, data);
  }

  loadRecentCommits(){
    return this._api.get(`${GITHUB_BASE_URL}/repos/${this.owner.login}/${this.name}/commits`)
      .then(commits => this.commits = commits);
  }

}

class GitHubOrg {
  constructor(gitHubAPI, data){
    this._api = gitHubAPI;
    Object.assign(this,data);
  }


  loadRepos(){
    if(!this._loadRepos){
      this._loadRepos = this._api.getAll(this.repos_url)
        .then(repos => repos.map(repo => new GitHubRepo(this._api, repo)))
        .then(repos => this.addRepos(repos));
    }
    return this._loadRepos;
  }

  getRepo(repoName){
    return this.loadRepos()
      .then((repos) => repos.filter((repo) => repo.name === repoName).pop())
  }

  addRepos(repos){
    this.repos = repos;
    return repos;
  }

}

//api consumer singleton, wrap's angular's $http for the github API
export class GitHubAPI {

  constructor($http,$q){
    this._http = $http;
    this._q = $q;
    this._authToken = undefined;
  }

  setAuthToken(token){
    this._access_token = token;
    return token;
  }

  get(url, params = {}){
    params.access_token = this._access_token;
    return this._http.get(url,{params})
      .then((res) => this._parseResponse(res));
  }

  getAll(url, params = {}, all = []){
    params.access_token = this._access_token;
    params.page = params.page || 1;
    return this.get(url,params).then(results => {
      if(!results.length){
        return all;
      }
      params.page++;
      return this.getAll(url, params, all.concat(results));
    });
  }

  _parseResponse(res){
    return res.data;
  }
}


GitHubAPI.$inject = ['$http','$q'];

//singleton user service representing the logged in user
export class GitHubUser {

  constructor(gitHubAPI, tokenStore, $location){
    this._api = gitHubAPI;
    this._tokenStore = tokenStore;
    this._$location = $location;
    this._userData = undefined;
    this._userOrgs = undefined;
  }

  authenticate(){
    return this._getToken()
      .then(() => this.getUser());
  }

  getUser(){
    if(!this._loadUserData){
      this._loadUserData = this._api.get(`${GITHUB_BASE_URL}/user`)
        .then((user) => this._userData = user);
    }
    return this._loadUserData;
  }

  getOrgs(){
    if(!this._loadUserOrgs){
      this._loadUserOrgs = this._api.get(`${GITHUB_BASE_URL}/user/orgs`)
        .then((userOrgs) => this._userOrgs = userOrgs);
    }
    return this._loadUserOrgs;
  }

  parseURLToken(){
    return this._$location.search()[GITHUB_TOKEN_KEY];
  }

  _getToken(){
      //check if we have one in the URL from the server
      let urlToken = this.parseURLToken()
      if(urlToken){
        //clear url
        this._$location.search({})
        return this._tokenStore.setToken(urlToken)
          .then((token) => this._api.setAuthToken(token));
      }
      //otherwise check storage (and reject if not found)
      return this._tokenStore.getToken()
        .then((token) => this._api.setAuthToken(token));
  }
}

GitHubUser.$inject = ['GitHubAPI','TokenStore','$location']

//singleton GitHub core services
export class GitHub {
  constructor(gitHubAPI,gitHubUser,$q){
    this._api = gitHubAPI;
    this._user = gitHubUser;
    this._orgs = [];
    this._q = $q;
  }

  get orgs(){
    return this._orgs;
  }

  checkAuthenticated(){
    return this._user.authenticate();
  }

  getUserOrgs(params){
    return this._user.getOrgs()
      .then(orgs => orgs.map((org) => new GitHubOrg(this._api, org)))
      .then((orgs) => this._orgs = orgs);
  }

  getOrg(orgLogin){
    let org = this._orgs.filter((org) => org.login === orgLogin).pop();
    if(org){
      return this._q.when(org);
    }
    return this._api.get(`${GITHUB_BASE_URL}/orgs/${orgLogin}`)
      .then((org) => new GitHubOrg(this._api, org))
      .then((org) => {
        this._orgs.push(org);
        return org;
      });
  }

  addOrg(org){
    return this.getOrg(org.login)
  }



}

GitHub.$inject = ['GitHubAPI','GitHubUser','$q'];
