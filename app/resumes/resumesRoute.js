(function() {
    'use strict';

    angular
        .module('app.resumes')
        .config(setupRoutes);

    function setupRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider.state('resumes', {
            url: '/resumes/:candidateId',
            templateUrl: 'resumes/views/resumeDetails.html',
            controller: 'ResumesCtrl',
            controllerAs: 'vm'
        },

        $urlRouterProvider.otherwise("/"));     
    }
})();
