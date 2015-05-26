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

import {GitHub, GitHubAPI, GitHubUser} from './services/GitHub';
import {TokenStore, TOKEN_NOT_FOUND, GITHUB_TOKEN_KEY} from './services/TokenStore';

import {AppViewController} from 'views/app-view/app-view-controller';
import {OrgViewController} from 'views/org-view/org-view-controller';
import {OrgsViewController} from 'views/orgs-view/orgs-view-controller';
import {RepoViewController} from 'views/repo-view/repo-view-controller';


//angular registration
const appName = 'GitRank';
const appDependencies = ['ngMaterial', 'ui.router'].concat(components);

//angular app
let app = angular.module(appName, appDependencies);

//app view controllers
app.controller('AppViewController',AppViewController);
app.controller('OrgViewController',OrgViewController);
app.controller('OrgsViewController',OrgsViewController);
app.controller('RepoViewController',RepoViewController);
//github services
app.service('GitHub',GitHub);
app.service('GitHubAPI',GitHubAPI);
app.service('GitHubUser',GitHubUser);
app.service('TokenStore',TokenStore);

//angular configuration
app.config(['$stateProvider', $stateProvider => {

  //abstract app state
  $stateProvider.state('app',{
    abstract: true,
    templateUrl: 'views/app-view/app-view.html',
    controller: 'AppViewController as appView',
    resolve: {
      userProfile: ['GitHub', (gitHub) => gitHub.checkAuthenticated()],
    }
  });

  //authentication splash page to redirect to server auth
  $stateProvider.state('authenticate',{
    url: '/authenticate',
    templateUrl: 'views/auth-view/auth-view.html'
  });

  $stateProvider.state('app.orgs',{
    url: '/orgs',
    templateUrl: 'views/orgs-view/orgs-view.html',
    controller: 'OrgsViewController as orgsView',
    resolve: {
      orgs: ['$stateParams','$q','GitHub','userProfile',($stateParams, $q, GitHub, user) => {
        return GitHub.getUserOrgs();
      }]
    }
  });

  $stateProvider.state('app.org',{
    url: '/orgs/:login',
    templateUrl: 'views/org-view/org-view.html',
    controller: 'OrgViewController as orgView',
    resolve: {
      org: ['$stateParams','$q','GitHub',($stateParams, $q, GitHub) => {
        return GitHub.getOrg($stateParams.login);
      }]
    }
  });

  $stateProvider.state('app.repoDetail',{
    url: '/orgs/:login/repos/:repoName',
    templateUrl: 'views/repo-view/repo-view.html' ,
    controller: 'RepoViewController as repoView',
    resolve: {
      repo: ['$stateParams','GitHub','$q', ($stateParams, GitHub, $q) => {
        let getOrg = GitHub.getOrg($stateParams.login);
        return getOrg.then((org) => {
          return org.getRepo($stateParams.repoName);
        });
      }]
    }
  });

}]);

//angular run
app.run(['$state', '$rootScope', '$window', 'GitHubUser',
  ($state, $rootScope, $window, GitHubUser) => {

  //state transition errors...
  $rootScope.$on('$stateChangeError',(ev, ...params) => {
    let error = params.pop();
    switch (error) {
      case TOKEN_NOT_FOUND:
        ev.preventDefault();
        $state.go('authenticate');
        break;
      default:

    }

  });
  $state.go('app.orgs');
}]);

const main = () => {
  return angular.bootstrap(document, [appName]);
}


//run
main();
