export class OrgsViewController {
  constructor(GitHub,orgs){
    this.orgs = orgs;
    this.GitHub = GitHub;
  }
}

OrgsViewController.$inject = ['GitHub','orgs'];
