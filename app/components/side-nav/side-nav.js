export class SideNavController {
  constructor(GitHub){
    console.log(GitHub);
  }
}

SideNavController.$inject = ['GitHub'];

export function SideNav(){
  return {
    restrict: 'E',
    templateUrl: 'components/side-nav/side-nav.html',
    controller: 'SideNavController as sideNav'
  }
}
