export let RepoSortOptions = [
  { propName: 'stargazers_count', display: 'Stars'},
  { propName: 'forks_count', display: 'Forks'},
  { propName: 'open_issues_count', display: 'Issues'},
  { propName: 'size', display: 'Size'}
]

export class RepoListViewController {
  constructor(GitHub, org){
    this.org = org;
  }
}

export class RepoListController {
  constructor(){
    this.search = {};
    this.orderOptions = RepoSortOptions;
    this.selectedOrderIndex = 0;
  }
  get orderByKey(){
    return this.orderOptions[this.selectedOrderIndex].propName;
  }

  get orderByHeader(){
    return this.orderOptions[this.selectedOrderIndex].display;
  }
}

export function RepoList() {
  return {
    restrict: 'E',
    scope: {
      repos: '='
    },
    templateUrl: 'components/repo-list/repo-list.html',
    controller :'RepoListController as repoList',
    bindToController: true
  }
}
