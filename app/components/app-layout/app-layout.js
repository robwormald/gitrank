export class AppLayoutController {
  constructor(sideNavDelegate){
    this._sideNavDelegate = sideNavDelegate;
    this.selectedOrg = {};
  }

  toggleNav(){
    this._sideNavDelegate.toggle('left');
  }
}

AppLayoutController.$inject = ['$mdSidenav'];
