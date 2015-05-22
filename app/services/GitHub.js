const GITHUB_BASE_URL = 'https://api.github.com';

export class GitHubAPI {

  constructor($http,$q){
    this._$http = $http;
    this._$q = $q;
    this._authToken = undefined;
  }

  setAuthToken(token){
    this._access_token = token;
  }

  get(url, params = {}){
    params.access_token = this._access_token;
    return this._$http.get(url,{params})
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


export class GitHub {
  constructor(gitHubAPI,$location){
    this._api = gitHubAPI;
    this._$location = $location;
    this._watchedOrgs = new Map();
  }

  get organizations(){
    return Array.from(this._watchedOrgs.values());
  }


  loadUserOrgs(params){
    return this._api.getAll(`${GITHUB_BASE_URL}/user/orgs`, params)
      .then(orgs => orgs.map((org) => this.cacheOrg(org)));
  }

  addOrg(org){
    return this._api.getPath(`orgs/${org.login}`)
      .then(org => this.cacheOrg(org));
  }

  cacheOrg(orgData){
    let org = new GitHubOrg(this._api, orgData);
    this._watchedOrgs.set(org.login, org);
    //async load the repos
    org.loadRepos();
    return org;
  }

  parseToken(){
    let token = this._$location.search().github_token;
    this._$location.search({})
    this._api.setAuthToken(token);
  }

}

GitHub.$inject = ['GitHubAPI','$location'];
