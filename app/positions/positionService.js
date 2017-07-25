(function() {
    'use strict';

    angular
        .module('app.positions')
        .service('PositionsService', PositionsService);

    PositionsService.$inject = ['$http', 'env'];

    function PositionsService($http, env) {
        var service = this;
        service.getPositions = getPositions;
        service.addPosition = addPosition;
        service.deletePosition = deletePosition;
        service.editPosition = editPosition;

        
        ////get all positions
        function getPositions() {
            return $http.get(env.apiUrl + 'jobs/');
        }

        ////add one candidate
        function addPosition(candidate) {
            return $http({
                url: env.apiUrl + 'jobs/' ,
                method: "POST",
                data: candidate
            });
        }

        ////edit one candidate
        function editPosition(candidate){
                return $http({
                url: env.apiUrl + 'jobs/' +  candidate._id,
                method: "PUT",
                data: candidate
            });

        }

        ////delete one candidate
        function deletePosition(candidateId) {
            return  $http.delete(env.apiUrl + 'jobs/' + candidateId, '');
        }
    }

})();