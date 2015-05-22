const GITHUB_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = '81887a525d6b32f2e2219257aa330ac905b9d465'

export class GitHubAPI {
  constructor($http,$q){
    this.$http = $http;
    this.$q = $q;
  }
  getPath(path, params = {}){
    params.access_token = GITHUB_TOKEN;
    return this.$http.get(`${GITHUB_BASE_URL}/${path}`,{params})
      .then((res) => this._parseResponse(res));
  }
  getUrl(url, params){
    return this.$http.get(url,{params})
      .then((res) => this._parseResponse(res));
  }

  _parseResponse(res){
    console.log(res.data)
    return res.data;
  }
}

GitHubAPI.$inject = ['$http','$q'];

class GitHubRepo {
  constructor(gitHubAPI, data){
    this._api = gitHubAPI;
    Object.assign(this, data);
  }
}

class GitHubOrg {
  constructor(gitHubAPI, data){
    this._api = gitHubAPI;
    Object.assign(this,data);
  }

  loadRepos(){
    return this._api.getUrl(this.repos_url)
      .then(repos => repos.map(repo => new GitHubRepo(this._api, repo)))
      .then(repos => this.addRepos(repos));
  }

  addRepos(repos){
    this.repos = repos;
    return repos;
  }

}


export class GitHub {
  constructor(gitHubAPI){
    this._api = gitHubAPI;
    this._watchedOrgs = new Map();
  }

  get organizations(){
    return Array.from(this._watchedOrgs.values());
  }

  addOrg(org){
    return this._api.getPath(`orgs/${org.login}`)
      .then((org) => this.cacheOrg(org));
  }

  cacheOrg(orgData){
    let org = new GitHubOrg(this._api, orgData);
    this._watchedOrgs.set(org.login, org);
    //async load the repos
    org.loadRepos();
    return org;
  }

}

GitHub.$inject = ['GitHubAPI'];
