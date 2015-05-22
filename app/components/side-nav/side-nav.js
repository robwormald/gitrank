export class SideNavController {
  constructor(GitHub){
    this.GitHub = GitHub;
    console.log(this.selectedOrg)
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
      selectedOrg: '='
    }
  }
}
