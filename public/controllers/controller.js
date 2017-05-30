var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', 
	function($scope, $http) {
    
    var refresh = function(){
        $http.get('/itemlist').then(function(response){
        	console.log("Got data!");
            $scope.itemlist = response.data;
        });
    };
    refresh();


    $scope.addItem = function(){ 
    	console.log($scope.item);       
        $http.post('/itemlist', $scope.item).then(function(response){
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id){
        console.log(id);
        $http.delete('/itemlist/' + id).then(function(response){
            refresh();
        });
    };

    $scope.edit = function(id){
        console.log(id);
        $http.get('/itemlist/' + id).then(function(response){
            $scope.item = response.data; 
        });

    };

     $scope.completed = function(id){
         //console.log(id);
         $http.get('/itemlist/' + id).then(function(response){
            $scope.item = response.data; 
        });
    };


    $scope.update = function(){
        console.log($scope.item._id);
        $http.put('/itemlist/' + $scope.item._id, $scope.item).then(function(response){
            refresh();
        });
    };

    $scope.deselect = function(){
        $scope.item = "";
    };

}]);