export class AppViewController {
  constructor(sideNavDelegate, userProfile, GitHub){
    this.GitHub = GitHub;
    this._sideNavDelegate = sideNavDelegate;
  }

  toggleNav(){
    this._sideNavDelegate.toggle('left');
  }
}

AppViewController.$inject = ['$mdSidenav','userProfile','GitHub'];
