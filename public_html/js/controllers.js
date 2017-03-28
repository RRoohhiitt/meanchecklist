var app = angular.module("UserLog");

app.controller('homeCtrl', ['$scope', function ($scope) {
    console.log("$scope");
}]);

app.controller('loginCtrl', ['$scope', 'UserDetailsService', 'UserAuth', '$state', function ($scope, UserDetailsService, UserAuth, $state) {
    $scope.login = function () {
        $scope.errText = undefined;
        UserAuth.isAuthenticated({
                user: $scope.login_model.user,
                psw: $scope.login_model.pass
            })
            .then(function (res) {
                UserDetailsService.setUser = {
                    user: $scope.login_model.user
                };
                localStorage.setItem('access_token', res.data.token);
                $state.go('list');
            }, function (err) {
                if (err.data && err.data.message) {
                    $scope.errText = err.data.message
                } else {
                    $scope.errText = "Error Occurred. Try Again!";
                }
            });
    }
}]);

app.controller('regCtrl', ['$scope', '$state', 'UserAuth', function ($scope, $state, UserAuth) {
    $scope.isRegistered = false;
    $scope.register = function (regForm) {
        $scope.errText = undefined;
        if (regForm.$valid) {
            UserAuth.registerUser({
                user: $scope.reg_model.user,
                psw: $scope.reg_model.psw,
                email: $scope.reg_model.email
            }).then(function (res) {
                $scope.isRegistered = true;
            }, function (err) {
                if (err.data && err.data.message) {
                    $scope.errText = err.data.message;
                } else {
                    $scope.errText = "Error Occurred. Try Again!";
                }
            });
        } else {
            return false;
        }
    }
}]);

app.controller('listCtrl', ['$scope', 'List', 'UserDetailsService', function ($scope, List, UserDetailsService) {

    if (isTokenAvailable()) {
        var vm = this;
        var query = localStorage.getItem('access_token');
        //    ListService.query().$promise.then(function(list){
        //        vm.list = list;
        //        console.log(vm)
        //    });
        console.log($scope.isNavHead);
        vm.user = UserDetailsService.getUser();

        function getList() {
            List.$promise.then(function (list) {
                vm.list = list.map(function (item) {
                    return {
                        id: item.id,
                        requirement: item.requirement,
                        contact_p: item.contact_p,
                        status: item.status
                    };
                });
            });
        }
        getList();
    } else {
        $state.go('login');
    }
}]);

app.controller('addListCtrl', ['$scope', 'ListService', '$q', '$state', function ($scope, ListService, $q, $state) {
    if (isTokenAvailable()) {
        $scope.isCreated = false;
        var query = localStorage.getItem('access_token');
        $scope.createEntry = function (entry) {
            $scope.errText = undefined;
            ListService
                .addToList({
                    requirement: entry.requirement,
                    contact_p: entry.contact_p,
                    acc_token: localStorage.getItem('access_token')
                })
                .then(function (res) {
                    $scope.isCreated = true;
                }, function (err) {
                    if (err.data.message) {
                        $scope.errText = err.data.message;
                    } else {
                        $scope.errText = "Error Occured! Try Again"
                    }
                });
        }
        $scope.createList = function () {
            ListService
                .getListLocal().query()
                .$promise.then(function (res) {
                    var promises = [];
                    for (var i = 0; i < 20; i++) {
                        promises[i] = createList(res[i]);
                    }
                    $q.all(promises).then(function (data) {
                        console.log(data)
                    }, function (err) {
                        console.log(err)
                    });
                }, function (err) {
                    if (err.data.message) {
                        $scope.errText = err.data.message;
                    } else {
                        $scope.errText = "Error Occured! Try Again"
                    }
                });

            function createList(entry) {
                return ListService.addToList({
                    requirement: entry.requirement,
                    contact_p: entry.contact_p,
                    acc_token: localStorage.getItem('access_token')
                })
            }
        }
    } else {
        $state.go('login');
    }
}]);

function isTokenAvailable() {
    return localStorage.getItem('access_token') ? true : false;
}