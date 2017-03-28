var app = angular.module("UserLog");

app.factory('ListService', ListService);
ListService.$inject = ['$resource', '$http'];

app.service('UserDetailsService', UserDetailsService);

app.service('UserAuth', UserAuthService);
UserAuthService.$inject = ['$http'];


function ListService($resource, $http) {
    var service = {
        getList: getList,
        addToList : addToList,
        getListLocal: getListLocal   //To be Removed {Temporary}
    }
    
    return service;
    function getList(){
        return $resource('/api/v1/getchecklist');
    } 
    
    function getListLocal(){         //To be Removed {Temporary}
        return $resource('checklist.json'); 
    }
    function addToList(entry){
        return $http.post('/api/v1/add_entry', entry);
    }
}

function UserAuthService($http) {
    var service = {
        isAuthenticated: authenticateUser,
        registerUser: regUser
    }
    return service;
    function authenticateUser(user) {
        return $http.post('/api/v1/login', user);
    }
    function regUser(user) {
        return $http.post('/api/v1/register', user);
    }
}

function UserDetailsService() {
    var self = this;
    return{
        getUser: function () {
            return self.user;
        },
        setUser: function (userObj) {
            self.user = JSON.parse(JSON.stringify(userObj));
        }
    }
}
