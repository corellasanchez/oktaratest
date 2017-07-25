(function() {
    'use strict';

    angular
        .module('app.positions')
        .controller('PositionsCtrl', PositionsCtrl);

    PositionsCtrl.$inject = ['PositionsService', '$stateParams', '$uibModal', '$filter'];

    function PositionsCtrl(PositionsService, $stateParams, $uibModal, $filter) {
        var vm = this;
        vm.positions = [];
        vm.modal = {};
        vm.openAddNewModal = openAddNewModal;
        vm.openDeleteModal = openDeleteModal;
        vm.openEditModal = openEditModal;

        activate();

        ////get the positions list from the service    
        function activate() {
            PositionsService.getPositions()
                .then(handleSuccess)
                .catch(handlePositionOperationError);
        }

        ////open the modal for add new positions
        function openAddNewModal() {
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'positions/views/positionAddNewModal.html',
                size: 'lg',
                controller: function($scope) {
                    $scope.position = {};
                    $scope.options = ['Male', 'Female'];
                    $scope.position.gender = $scope.options[0];

                    $scope.save = function() {
                        PositionsService.addPosition($scope.position)
                            .then(handleAddPositionSuccess)
                            .catch(handlePositionOperationError);
                    };

                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

        ////open the modal that confirms the elimination of a position
        function openDeleteModal(positionId) {
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'positions/views/positionConfirmDelete.html',
                size: 'sm',
                controller: function($scope) {
                    $scope.positionId = positionId;
                    $scope.delete = function() {
                        PositionsService.deletePosition(positionId)
                            .then(handleDeletePosition)
                            .catch(handlePositionOperationError);
                    };

                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

        ////open the modal for edit the positions
        function openEditModal(position) {
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'positions/views/positionEditModal.html',
                size: 'lg',
                controller: function($scope) {
                    $scope.options = ['Male', 'Female'];
                    $scope.positionToEdit = JSON.parse(JSON.stringify(position));
                    $scope.edit = function() {
                        PositionsService.editPosition($scope.positionToEdit)
                            .then(handleEditPosition)
                            .catch(handlePositionOperationError);
                    };

                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

        ////Query all the positions 
        function handleSuccess(result) {
            vm.positions = result.data;
        }

        ////Manage the position aggregate event
        function handleAddPositionSuccess(result) {
            vm.modal.close();
            activate();
            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'positions/views/positionAddedModal.html',
                size: 'sm',
                controller: function($scope) {
                    $scope.ssn = result.data.inserted_record_id;
                    $scope.cancel = function() {
                        vm.modal.close();
                    };
                }
            });
        }

         ////Manage the position deletion event
        function handleDeletePosition(result) {
            console.log(result);
            vm.modal.close();
            activate();
        }


        ////Manage the position edit event
        function handleEditPosition(result) {
            console.log(result);
            vm.modal.close();
            activate();
        }
        

        ////Manage the position aggregate error event
        function handlePositionOperationError(error) {
            vm.modal.close();

            if (error.data.error.startsWith("E11000")) {
                error.data.error = "The position ID is already in the database."
            }

            vm.modal = $uibModal.open({
                animation: true,
                templateUrl: 'positions/views/positionErrorModal.html',
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