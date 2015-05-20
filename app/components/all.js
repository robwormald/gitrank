import angular from 'angular';

import {AppLayoutController} from './app-layout/app-layout';
import {SideNav, SideNavController} from './side-nav/side-nav';

const components = 'GitRank.Components';

let componentModule = angular.module(components, ['ngMaterial']);

componentModule.controller('AppLayoutController',AppLayoutController);
componentModule.controller('SideNavController', SideNavController);
componentModule.directive('sideNav', SideNav);

//export string name for angular consumption
export {components}
