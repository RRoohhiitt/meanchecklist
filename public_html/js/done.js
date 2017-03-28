angular
    .module("UserLog", ['ui.router', 'ngResource'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                name: 'home',
                url: '/home',
                templateUrl: "views/home.html",
                controller: "homeCtrl"
            })
            .state({
                name: 'login',
                url: '/login',
                templateUrl: "views/login.html",
                controller: "loginCtrl"
            })
            .state({
                name: 'register',
                url: '/register',
                templateUrl: "views/register.html",
                controller: "regCtrl"
            })
            .state({
                name: 'list',
                url: '/list',
                templateUrl: 'views/list.html',
                controller: "listCtrl",
                controllerAs: "checklists",
                resolve: {
                    List: function (ListService) {
                        return ListService.getList().query({
                            acc_token: localStorage.getItem('access_token')
                        });
                    }
                }
            })
            .state({
                name: 'addtolist',
                url: '/addlist',
                templateUrl: 'views/list_add.html',
                controller: "addListCtrl"
            })
    })
    .run(['$state', function ($state) {
        $state.transitionTo('home');

    }]);


if (typeof (Storage) == 'undefined') {
    window.localStorage = {
        _data: {},
        setItem: function (id, val) {
            return this._data[id] = String(val);
        },
        getItem: function (id) {
            return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
        },
        removeItem: function (id) {
            return delete this._data[id];
        },
        clear: function () {
            return this._data = {};
        }
    };
}