(function() {
    'use strict';

    angular
        .module('app.candidates')
        .service('CandidatesService', CandidatesService);

    CandidatesService.$inject = ['$http', 'env'];

    function CandidatesService($http, env) {
        var service = this;
        service.getCandidates = getCandidates;
        service.addCandidate = addCandidate;
        service.deleteCandidate = deleteCandidate;
        service.editCandidate = editCandidate;

        
        ////get all candidates
        function getCandidates() {
            return $http.get(env.apiUrl + 'candidates/');
        }

        ////add one candidate
        function addCandidate(candidate) {
            return $http({
                url: env.apiUrl + 'candidates/' ,
                method: "POST",
                data: candidate
            });
        }

        ////edit one candidate
        function editCandidate(candidate){
            console.log("se llamo", candidate);
            return $http({
                url: env.apiUrl + 'candidates/' +  candidate._id,
                method: "PUT",
                data: candidate
            });

        }

        ////delete one candidate
        function deleteCandidate(candidateId) {
            return  $http.delete(env.apiUrl + 'candidates/' + candidateId, '');
        }
    }

})();