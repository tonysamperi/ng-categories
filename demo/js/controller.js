module.controller("myController", ["$scope", "$http", "ngCatoggle", function($scope, $http, ngCatoggle) {
	$scope.myList = {};
	$scope.catoggle = ngCatoggle;
    var init = function() {
        $http.get("./data/prodotti.json").then(function(r) {
            var response = r.data;
            if (angular.isDefined(response.data)) {
                $scope.myList = response.data.products;
            }
        }, function(error) {
            console.log("call \"prodotti\" error", error);
        });
    };

    $scope.panels = {
        "cat": [],
        "nationality": []
    };
    
    init();
}]);