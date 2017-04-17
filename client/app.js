var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function ($routeProvider) {
    $routeProvider
    .when("/index", {
        templateUrl: "/partials/user-index.html",
        controller: "userIndexController"
    })
    .when("/new", {
        templateUrl: "/partials/new-user.html",
        controller: "newUserController"
    })
    .when("/show/:itemId", {
        templateUrl: "/partials/show-user.html",
        controller: 'showUserController'
    })
    .when("/edit/:itemId", {
        templateUrl: "/partials/edit_user.html",
        controller: 'editUserController'
    })
    .otherwise("/index");
});


// Start of Factory 


app.factory('userFactory', function($http){
    var factory = {};
    var users = [
        { first_name: 'Peter', last_name: 'Herman', birthday: new Date() },
    ];

    factory.addUser = function(user, finishedAddingUser){
        $http.post('/api/users', user).then(function(response){
            users.push(response.data.user);
            finishedAddingUser();
        });
    } 

    factory.getUser = function(searchID, receivedUser){
        // takes parameter of user id (searchID) and returns receivedUser
        $http.get('/api/users/' + searchID).then(function(response){
            receivedUser(response.data.user);
        })
    }

    factory.editUser = function(editedUser, receivedUser){
        $http.put('/api/users/' + editedUser._id, {first_name: editedUser.first_name, last_name: editedUser.last_name, birthday: editedUser.birthday})
        .then(function(response){
            user = response.data;
            receivedUser(user);
        })
    }

    factory.deleteUser = function(searchID, callback){
        $http.delete('/api/users/' + searchID);
        callback(users);
    }

    factory.allUsers = function(receivedUsers){
        $http.get('/api/users').then(function(response){
            users = response.data.users;
            receivedUsers(users);
        })
    }
    factory.login = function(data, callback, err){
        $http.post('/login', data).then(callback,err);
    }

    return factory;
})


// Start of Controllers


app.controller('userIndexController', function($scope, userFactory, $routeParams){
    userFactory.allUsers(function(users){
        $scope.users = users;
    });
    $scope.removeUser = function(searchID){
        userFactory.deleteUser(searchID, function(users){
            $scope.users = users;
        })
    }
});

app.controller('showUserController', function($scope, $routeParams, userFactory){
    var searchID = $routeParams.itemId;
    userFactory.getUser(searchID, function(user){
        $scope.user = user;
    })
});

app.controller('editUserController', function($scope, $routeParams, $location, userFactory){
    var searchID = $routeParams.itemId;

    //first a get request to get user info. searchID comes from url parameter.
    userFactory.getUser(searchID, function(user){
        $scope.user = user;
    })
    $scope.editUser = function(){
        var userData = $scope.editedUser; // pulling new data for the user from scope and assigned to variable
        userData._id = $routeParams.itemId; // adding on ID to userData
        userFactory.editUser(userData, function(){
            $scope.editedUser = {};
        })
        $location.url('/index'); // Redirect to index
    }
})

app.controller('newUserController', function($scope, userFactory, $location){
    $scope.addUser = function(){
        userFactory.addUser($scope.user, function(){
            $scope.user = {};
        });
        $location.url('/index'); // Redirect to index
    }
});