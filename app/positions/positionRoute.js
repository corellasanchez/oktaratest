(function() {
    'use strict';

    angular
        .module('app.positions')
        .config(setupRoutes);

    function setupRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider.state('positions', {
            url: '/positions',
            templateUrl: 'positions/views/positionList.html',
            controller: 'PositionsCtrl',
            controllerAs: 'vm'
        },
        $urlRouterProvider.otherwise("/"));
      
    }
})();
