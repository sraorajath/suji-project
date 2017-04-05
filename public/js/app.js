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
  var new_products = []

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
    $http.put('/api/updateProductById/' + productId, data)
      .then(function(res) {
        if(res.data.message == 'success') {
          new_products.push(res.data.data)
          $('#checkboxes').find('.enter_quantity').css('display', 'none')
          $state.reload()
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  $('#search').keyup(function() {
    const result = search2($scope.products, $(this).val())
    $scope.products = result
  })

  function search2(source, name) {
    var results = [];
    var index;
    var entry;
    name = name.toUpperCase();
    for (index = 0; index < source.length; ++index) {
      entry = source[index];
      if (entry.name.toUpperCase().indexOf(name) !== -1) {
        results.push(entry);
      }
    }
    return results;
  }

  // var search1 = function(){
  //   var searchVal = document.getElementById("contact-serach").value;
  //   var results = search2($scope.products);
  //   $scope.products = reault
  // }

})