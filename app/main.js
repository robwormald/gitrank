//app main entry point

//angular 1.x
import angular from 'angular';

//angular material
import 'angular-material';
import 'angular-material/angular-material.css!css';
//ui router
import 'angular-ui-router';

//modules
import {components} from './components/all';

import {GitHub} from './services/GitHub';


//angular registration
const appName = 'GitRank';
const appDependencies = ['ngMaterial', 'ui.router'].concat(components);

//angular app
let app = angular.module(appName, appDependencies);

//angular services
app.service('GitHub',GitHub);


//angular configuration
app.config(['$stateProvider', $stateProvider => {

  //abstract app state
  $stateProvider.state('app',{
    abstract: true,
    templateUrl: 'components/app-layout/app-layout.html',
    controller: 'AppLayoutController as appLayout'
  });

  $stateProvider.state('app.home',{
    //abstract: true,
    template: '<div>hello world</div>'
  });

}]);

//angular run
app.run(['$state', $state => {

  $state.go('app.home');

}]);

const main = () => {
  return angular.bootstrap(document, [appName]);
}


//run
main();
