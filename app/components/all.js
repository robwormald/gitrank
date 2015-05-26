import angular from 'angular';

import {SideNav, SideNavController} from './side-nav/side-nav';
import {OrgList, OrgListController} from './org-list/org-list';
import {OrgCard, OrgCardController} from './org-card/org-card';
import {RepoList, RepoListController} from './repo-list/repo-list';
import {RepoDetail, RepoDetailController} from './repo-detail/repo-detail';


const components = 'GitRank.Components';

let componentModule = angular.module(components, ['ngMaterial']);

componentModule.directive('sideNav', SideNav);
componentModule.controller('SideNavController', SideNavController);

componentModule.directive('orgList',OrgList);
componentModule.controller('OrgListController',OrgListController);

componentModule.directive('orgCard',OrgCard);
componentModule.controller('OrgCardController',OrgCardController);

componentModule.directive('repoList',RepoList);
componentModule.controller('RepoListController',RepoListController);

componentModule.directive('repoDetail',RepoDetail);
componentModule.controller('RepoDetailController',RepoDetailController);

//export string name for angular consumption
export {components}
