const GITHUB_BASE_URL = 'https://api.github.com';



export class GitHub {
  constructor($http){
    this._http = $http;
  }

  get(path, params){
    let url = `${GITHUB_BASE_URL}/${path}`;
    return this._http.get(url, {params});
  }
}

GitHub.$inject = ['$http'];
