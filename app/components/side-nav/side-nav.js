export class SideNavController {
  constructor(GitHub){
    this.GitHub = GitHub;
  }

  addOrg(newOrg){
    if(newOrg && newOrg.login){
      this.GitHub.addOrg(newOrg);
    }
    this.newOrg = {};
  }
  setSelectedOrg(org){
    this.selectedOrg = org;
  }
}

SideNavController.$inject = ['GitHub'];

export function SideNav(){
  return {
    restrict: 'E',
    templateUrl: 'components/side-nav/side-nav.html',
    controller: 'SideNavController as sideNav',
    bindToController: true,
    scope: {
      orgs: '='
    }
  }
}
