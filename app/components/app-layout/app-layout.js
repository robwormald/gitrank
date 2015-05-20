export class AppLayoutController {
  constructor(sideNavDelegate){
    this._sideNavDelegate = sideNavDelegate;
  }

  toggleNav(){
    this._sideNavDelegate.toggle('left');
  }
}

AppLayoutController.$inject = ['$mdSidenav'];
