export class OrgListController {
  constructor(){
    console.log(this.orgs)
  }

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
