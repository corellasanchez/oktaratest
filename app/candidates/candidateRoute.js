(function() {
    'use strict';

    angular
        .module('app.candidates')
        .config(setupRoutes);

    function setupRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider.state('candidates', {
            url: '/',
            templateUrl: 'candidates/views/candidateList.html',
            controller: 'CandidatesCtrl',
            controllerAs: 'vm'
        },

       

        $urlRouterProvider.otherwise("/"));
      
    }
})();
