export const TOKEN_KEY = 'GITHUB_TOKEN'
export const TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND';

export class TokenStore {
  constructor($q, $window, $location){
    this._$q = $q;
    this._storage = $window.localStorage;

    let token = $location.search()[TOKEN_KEY];
    if(token){
      $location.search({});
      setToken(token);
    }
  }
  getToken(){
    return this._$q((resolve, reject) => {
      let token = this._storage.getItem(TOKEN_KEY);
      if(!token){
        reject(TOKEN_NOT_FOUND);
        return;
      }
      resolve(token);
    });
  }
  setToken(token){
    return this._$q((resolve, reject) => {
      let ok = this._storage.setItem(TOKEN_KEY,token);
      resolve(token);
    });
  }


}

TokenStore.$inject = ['$q','$window', '$location'];
