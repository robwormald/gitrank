export class RepoDetailViewController {
  constructor(GitHub,repo){
    console.log(github)
    this.GitHub = GitHub;
    this.repo = repo;
  }
}
export class RepoDetailController {
  constructor(GitHub){
    this.GitHub = GitHub;
  }
}

export function RepoDetail(){
  return {
    restrict: 'E',
    scope: {
      repo: '='
    },
    controller: 'RepoDetailController as repoDetail',
    bindToController: true
  }
}
