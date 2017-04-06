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
app.controller('contentController', function($scope, $location, $http, $state) {
  console.log(JSON.parse(localStorage.getItem('session')))
  $(document).on('click', '#checkboxes label', function() {
    $(this).prevUntil("input").prop('checked', true);
    $(this).prev().show();
    // let product_id = $(this).parent().attr('data-value')
    $(this).find('.product-name').css('display', 'none')
    $(this).find('.enter_quantity').css('display', 'block')
  })
  $(document).on('click', '#checkboxes .check_overlay', function() {
    $(this).prev().prop('checked', false);
		$(this).hide();
    $(this).parent().find('.product-name').css('display', 'block')
    $(this).parent().find('.enter_quantity').css('display', 'none')
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

  $scope.save = function(productId, quantity) {
    const data = {
      quantity: quantity
    }
    const selected_data = {
      productId: productId,
      quantity: quantity
    }
    SaveDataToLocalStorage(selected_data)
    $http.put('/api/updateProductById/' + productId, data)
      .then(function(res) {
        if(res.data.message == 'success') {
          $('#checkboxes').find('.enter_quantity').css('display', 'none')
          $scope.getAllProducts()
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }
})

function SaveDataToLocalStorage(data) {
  let temp = []
  temp = JSON.parse(localStorage.getItem('session'))
  if(temp == null) {
    temp = []
    temp.push(data)
    console.log(temp)
    localStorage.setItem('session', JSON.stringify(temp));
  } else {
    temp.push(data)
    console.log(temp)
    localStorage.setItem('session', JSON.stringify(temp));
  }
}