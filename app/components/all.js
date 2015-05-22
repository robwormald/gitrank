import angular from 'angular';

import {AppLayoutController} from './app-layout/app-layout';
import {SideNav, SideNavController} from './side-nav/side-nav';
import {OrgList, OrgListController} from './org-list/org-list';
import {OrgCard, OrgCardController} from './org-card/org-card';
import {RepoList, RepoListController} from './repo-list/repo-list';

const components = 'GitRank.Components';

let componentModule = angular.module(components, ['ngMaterial']);

componentModule.controller('AppLayoutController',AppLayoutController);

componentModule.directive('sideNav', SideNav);
componentModule.controller('SideNavController', SideNavController);

componentModule.controller('OrgListController',OrgListController);

componentModule.directive('orgCard',OrgCard);
componentModule.controller('OrgCardController',OrgCardController);

componentModule.directive('repoList',RepoList);
componentModule.controller('RepoListController',RepoListController);

//export string name for angular consumption
export {components}
