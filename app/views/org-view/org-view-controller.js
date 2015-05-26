export class OrgViewController {
  constructor(org){
    this.org = org;
    //load repos
    this.org.loadRepos()
  }
}

OrgViewController.$inject = ['org'];
