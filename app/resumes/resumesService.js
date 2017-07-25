(function() {
    'use strict';

    angular
        .module('app.resumes')
        .service('ResumesService', ResumesService);

    ResumesService.$inject = ['$http', 'env'];

    function ResumesService($http, env) {
        var service = this;
        service.getResume = getResume;
        service.addResume = addResume;
        service.deleteResume = deleteResume;
        service.editResume = editResume;

        
        ////get all resumes
        function getResume(candidateId) {
            return $http.get(env.apiUrl + 'resumes/' + candidateId );
        }

        ////add one Resume
        function addResume(resume) {
            return $http({
                url: env.apiUrl + 'resumes/' ,
                method: "POST",
                data: resume
            });
        }

        ////edit one Resume
        function editResume(resume){
            
            return $http({
                url: env.apiUrl + 'resumes/' +  resume._id,
                method: "PUT",
                data: resume
            });

        }

        ////delete one Resume
        function deleteResume(ResumeId) {
            return  $http.delete(env.apiUrl + 'resumes/' + ResumeId, '');
        }
    }

})();