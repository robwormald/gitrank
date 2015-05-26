export class OrgListController {
  constructor(){}
}

export function OrgList(){
  return {
    restrict: 'E',
    templateUrl: 'components/org-list/org-list.html',
    controller: 'OrgListController as orgList',
    bindToController: true,
    scope: {
      orgs: '='
    }
  }
}
