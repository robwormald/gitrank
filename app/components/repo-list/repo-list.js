export let RepoSortOptions = [
  { propName: 'stargazers_count', display: 'Stars'},
  { propName: 'forks_count', display: 'Forks'},
  { propName: 'open_issues_count', display: 'Open Issues'},
  { propName: 'watchers', display: 'Watchers'}
]

export class RepoListController {
  constructor(){
    this.filterBy = {};
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