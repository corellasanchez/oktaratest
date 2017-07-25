(function() {
    'use strict';

    angular
        .module('app.resumes')
        .controller('ResumesCtrl', ResumesCtrl);

    ResumesCtrl.$inject = ['ResumesService', '$stateParams', '$uibModal', '$filter'];

    function ResumesCtrl(ResumesService, $stateParams, $uibModal, $filter) {
        var vm = this;
        vm.resume = [];
        vm.resume._id = $stateParams.candidateId;
        vm.modal = {};
        vm.openDeleteModal = openDeleteModal;
        vm.editResume = editResume;

        activate(vm.candidateId);

        ////get the resumes list from the service    
        function activate(candidateId) {
            ResumesService.getResume(vm.resume._id)
                .then(handleSuccess)
                .catch(handleResumeOperationError);
        }

        ////get the candidate resume
        function handleSuccess(result) {
            vm.resume = result.data;
        }

        ////Update the resume
        function editResume() {
            vm.resume._id = $stateParams.candidateId;
            ResumesService.editResume(vm.resume)
                .then(handleEditResume)
                .catch(handleResumeOperationError);

        }

        ////Manage the resume edit event
        function handleEditResume(result) {
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'resumes/views/resumeEditedModal.html',
                size: 'sm',
                controller: function($scope) {
                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });

        }

        ////open the modal that confirms the elimination of a resume
        function openDeleteModal(resumeId) {
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'resumes/views/resumeConfirmDelete.html',
                size: 'sm',
                controller: function($scope) {
                 vm.resume._id = $stateParams.candidateId;
                    $scope.delete = function() {
                        ResumesService.deleteResume(vm.resume._id)
                            .then(handleDeleteresume)
                            .catch(handleResumeOperationError);
                    };

                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

        ////Manage the resume deletion event
        function handleDeleteresume(result) {
            vm.modal.close();
            activate();
        }


        ////Show errors to the user
        function handleResumeOperationError(error) {
            vm.modal.close();
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'resumes/views/resumeErrorModal.html',
                size: 'sm',
                controller: function($scope) {
                    $scope.error = error.data.error;
                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }
    }

})();