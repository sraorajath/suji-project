const app = angular.module('myApp', ['ui.router'])

app.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('content', {
      url: '/content',
      templateUrl: '/views/content.html.ejs',
      controller: 'contentController'
    })
  $urlRouterProvider.otherwise('/content')
})
app.controller('contentController', function($scope, $location, $http) {
  $(document).on('click', '#checkboxes label', function() {
    $(this).prevUntil("input").prop('checked', true);
    $(this).prev().show();
  })
  $(document).on('click', '#checkboxes .check_overlay', function() {
    $(this).prev().prop('checked', false);
		$(this).hide();
  })

  $scope.getAllProducts = function() {
    $http.get('/api/getAllProducts')
      .then(function(res) {
        if(res.data.message == 'success') {
          $scope.products = res.data.data
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }

})