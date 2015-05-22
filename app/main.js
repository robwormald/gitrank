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

import {GitHub, GitHubAPI} from './services/GitHub';


//angular registration
const appName = 'GitRank';
const appDependencies = ['ngMaterial', 'ui.router'].concat(components);

//angular app
let app = angular.module(appName, appDependencies);

//github services
app.service('GitHub',GitHub);
app.service('GitHubAPI',GitHubAPI);


//angular configuration
app.config(['$stateProvider', $stateProvider => {

  //abstract app state
  $stateProvider.state('app',{
    abstract: true,
    templateUrl: 'components/app-layout/app-layout.html',
    controller: 'AppLayoutController as appRootController'
  });

  $stateProvider.state('app.orgs',{
    template: '<org-list orgs="appRootController.selectedOrgs" selectedOrg="appRootController.selectedOrg"></repo-list>',
    controller: 'OrgListController as orgList'
  });

  $stateProvider.state('app.repos',{
    template: `<repo-list repos="appRootController.selectedOrg.repos"></repo-list>`,
    controller: 'OrgListController as orgList'
  });

}]);

//angular run
app.run(['$state','$location', 'GitHub', ($state,$location, GitHub) => {

  //grab the auth token
  GitHub.parseToken();
  GitHub.loadUserOrgs();
  $state.go('app.repos');

}]);

const main = () => {
  return angular.bootstrap(document, [appName]);
}


//run
main();
