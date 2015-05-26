export class AppViewController {
  constructor(sideNavDelegate, userProfile, GitHub){
    this.GitHub = GitHub;
    this._sideNavDelegate = sideNavDelegate;
  }

  toggleNav(){
    console.log(this._sideNavDelegate)
    this._sideNavDelegate('left').toggle();
  }
}

AppViewController.$inject = ['$mdSidenav','userProfile','GitHub'];
