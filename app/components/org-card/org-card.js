export class OrgCardController {
  constructor(){

  }
}

export function OrgCard() {
  return {
    restrict: 'E',
    scope: {
      org: '='
    },
    templateUrl: 'components/org-card/org-card.html',
    controller :'GitHubOrgCardController as orgCard',
    bindToController: true
  }
}
