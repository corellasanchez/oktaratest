(function() {
    'use strict';

    angular
        .module('app.candidates')
        .controller('CandidatesCtrl', CandidatesCtrl);

    CandidatesCtrl.$inject = ['CandidatesService', '$stateParams', '$uibModal', '$filter'];

    function CandidatesCtrl(CandidatesService, $stateParams, $uibModal, $filter) {
        var vm = this;
        vm.candidates = [];
        vm.modal = {};
        vm.openAddNewModal = openAddNewModal;
        vm.openDeleteModal = openDeleteModal;
        vm.openEditModal = openEditModal;

        activate();

        ////get the candidates list from the service    
        function activate() {
            CandidatesService.getCandidates()
                .then(handleSuccess)
                .catch(handleCandidateOperationError);
        }

        ////open the modal for add new candidates
        function openAddNewModal() {
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'candidates/views/candidateAddNewModal.html',
                size: 'lg',
                controller: function($scope) {
                    $scope.candidate = {};
                    $scope.options = ['Male', 'Female'];
                    $scope.candidate.gender = $scope.options[0];

                    $scope.save = function() {
                        CandidatesService.addCandidate($scope.candidate)
                            .then(handleAddCandidateSuccess)
                            .catch(handleCandidateOperationError);
                    };

                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

        ////open the modal that confirms the elimination of a candidate
        function openDeleteModal(candidateId) {
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'candidates/views/candidateConfirmDelete.html',
                size: 'sm',
                controller: function($scope) {
                    $scope.ssn = candidateId;
                    $scope.delete = function() {
                        CandidatesService.deleteCandidate(candidateId)
                            .then(handleDeleteCandidate)
                            .catch(handleCandidateOperationError);
                    };

                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

        ////open the modal for edit the candidates
        function openEditModal(candidate) {
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'candidates/views/candidateEditModal.html',
                size: 'lg',
                controller: function($scope) {
                    $scope.options = ['Male', 'Female'];
                    $scope.candidateToEdit = JSON.parse(JSON.stringify(candidate));
                    $scope.candidateToEdit.date_of_birth = $filter('date')($scope.candidateToEdit.date_of_birth.$date.$numberLong, "yyyy-MM-ddTHH:mm:ss.sss");
                    $scope.edit = function() {
                        CandidatesService.editCandidate($scope.candidateToEdit)
                            .then(handleEditCandidate)
                            .catch(handleCandidateOperationError);
                    };

                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

        ////Query all the candidates 
        function handleSuccess(result) {
            vm.candidates = result.data;
        }

        ////Manage the candidate aggregate event
        function handleAddCandidateSuccess(result) {
            vm.modal.close();
            activate();
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'candidates/views/candidateAddedModal.html',
                size: 'sm',
                controller: function($scope) {
                    $scope.ssn = result.data.inserted_record_id;
                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

         ////Manage the candidate deletion event
        function handleDeleteCandidate(result) {
            console.log(result);
            vm.modal.close();
            activate();
        }


        ////Manage the candidate edit event
        function handleEditCandidate(result) {
            console.log(result);
            vm.modal.close();
            activate();
        }
        

        ////Manage the candidate aggregate error event
        function handleCandidateOperationError(error) {
            vm.modal.close();

            if (error.data.error.startsWith("E11000")) {
                error.data.error = "The social security number is already in the database."
            }

            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'candidates/views/candidateErrorModal.html',
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