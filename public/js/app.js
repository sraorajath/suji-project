const app = angular.module('myApp', ['ui.router'])

app.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('shopname', {
      url: '/shopname',
      templateUrl: '/views/shopname.html.ejs',
      controller: 'shopnameController'
    })
    .state('icecream', {
      url: '/icecream',
      templateUrl: '/views/content.html.ejs',
      controller: 'contentController'
    })
    .state('icecream.default', {
      url: '/family-packs',
      templateUrl: '/views/products.html.ejs',
      controller: 'familyPackController'
    })
    .state('icecream.dessert', {
      url: '/dessert',
      templateUrl: '/views/products.html.ejs',
      controller: 'dessertController'
    })
    .state('icecream.cup', {
      url: '/cup',
      templateUrl: '/views/products.html.ejs',
      controller: 'cupController'
    })
    .state('icecream.ball', {
      url: '/ball',
      templateUrl: '/views/products.html.ejs',
      controller: 'ballController'
    })
    .state('icecream.candy', {
      url: '/candy',
      templateUrl: '/views/products.html.ejs',
      controller: 'candyController'
    })
    .state('icecream.tub', {
      url: '/tub',
      templateUrl: '/views/products.html.ejs',
      controller: 'tubController'
    })
    .state('icecream.others', {
      url: '/others',
      templateUrl: '/views/products.html.ejs',
      controller: 'othersController'
    })
    .state('bill', {
      url: '/generateBill',
      templateUrl: '/views/generatebill.html.ejs',
      controller: 'generateBillController'
    })
    .state('addShop', {
      url: '/addShops',
      templateUrl: '/views/addShop.html.ejs',
      controller: 'addShopController'
    })
  $urlRouterProvider.otherwise('/icecream')
})
app.controller('contentController', function($scope, $location, $http) {
  $scope.getLoacalstorageValues = function() {
    if(JSON.parse(localStorage.getItem('session'))) {
      $scope.valueExists = true
    } else {
      $scope.valueExists = false
    }
  }

  $scope.generateBill = function() {
    $location.path('/generateBill')
  }

  $scope.addShops = function() {
    $location.path('/addShops')
  }

  $scope.tabs = [{
    title: 'Family Pack',
    url: 'icecream.default'
  }, {
    title: 'Dessert',
    url: 'icecream.dessert'
  }, {
    title: 'Cup Ice Cream',
    url: 'icecream.cup'
  }, {
    title: 'Ball Ice Cream',
    url: 'icecream.ball'
  }, {
    title: 'Candy',
    url: 'icecream.candy'
  }, {
    title: 'Tub',
    url: 'icecream.tub'
  }, {
    title: 'Others',
    url: 'icecream.others'
  }]

  $scope.clickTab = function(tab) {
    $scope.currentTab = tab.url
  }

  $scope.isActiveTab = function(tabUrl) {
    if($location.path() == '/icecream' || $location.path() == '/icecream/family-packs') {
      return tabUrl == "icecream.default"
    } if($location.path() == '/icecream/dessert') {
      return tabUrl == "icecream.dessert"
    } if($location.path() == '/icecream/cup') {
      return tabUrl == "icecream.cup"
    } if($location.path() == '/icecream/ball') {
      return tabUrl == "icecream.ball"
    } if($location.path() == '/icecream/candy') {
      return tabUrl == "icecream.candy"
    } if($location.path() == '/icecream/tub') {
      return tabUrl == "icecream.tub"
    } if($location.path() == '/icecream/others') {
      return tabUrl == "icecream.others"
    }
  }
})
app.controller('familyPackController', function($scope, $location, $http, $state) {
  $(document).on('click', '#checkboxes label', function() {
    $(this).prevUntil("input").prop('checked', true);
    $(this).prev().show();
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
    getProductByType($http, "familypack").then(function(res) {
      console.log(res)
      $scope.products = res
    })
  }

  $scope.save = function(product, quantity) {
    if(!isNaN(quantity)) {
      updateQuantity(product, quantity, $http, $scope.shopname).then(function(res) {
        $scope.getAllProducts()
        $scope.submit = 1
        // $state.reload()
      }) 
    } else {
      $scope.notNumber = true
      $scope.for = product._id
      setTimeout(function() {
        $('#nmessage').fadeOut('fast');
      }, 3000); 
    }
  }
})

app.controller('dessertController', function($scope, $http, $location) {
  $(document).on('click', '#checkboxes label', function() {
    $(this).prevUntil("input").prop('checked', true);
    $(this).prev().show();
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
    getProductByType($http, "dessert").then(function(res) {
      $scope.products = res
    })
  }

  $scope.save = function(product, quantity) {
    updateQuantity(product, quantity, $http).then(function(res) {
      $scope.getAllProducts()
    })
  }
})

app.controller('cupController', function($scope, $http, $location) {
  $(document).on('click', '#checkboxes label', function() {
    $(this).prevUntil("input").prop('checked', true);
    $(this).prev().show();
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
    getProductByType($http, "cup").then(function(res) {
      $scope.products = res
    })
  }

  $scope.save = function(product, quantity) {
    updateQuantity(product, quantity, $http).then(function(res) {
      $scope.getAllProducts()
    })
  }
})

app.controller('generateBillController', function($scope, $location, $http) {
  $scope.getSelectedItems = function() {
    $scope.selectedItem = JSON.parse(localStorage.getItem('session'))
  }

  $scope.getData = function(product) {
    $http.get('/api/getProductById/' + product)
      .then(function(res) {
        if(res.data.message == 'success') {
          $scope.productDetails = res.data.data
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  $scope.getAllShops = function() {
    $http.get('/api/getAllShops')
      .then(function(res) {
        $scope.shops = res.data.data
      })
      .catch(function(err) {
        console.log
      })
  }

  $scope.remove = function(data) {
    console.log(data.product._id)
  }

  $scope.print = function() {
    printData()
  }

  $scope.saveData = function(selectedItem) {
    console.log($scope.shopname, selectedItem)
  }
})

app.controller('addShopController', function($scope, $http, $location) {
  $scope.addNewShop = function() {
    const data = {
      shopname: $scope.shopname,
      address: $scope.shopaddress
    }
    $http.post('/api/addNewShop', data)
      .then(function(res) {
        if(res.data.message == 'success') {
          $location.path('/')
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }
})

function getProductByType($http, type) {
  return $http.get('/api/getAllProducts/' + type)
    .then(function(res) {
      if(res.data.message == 'success') {
        return res.data.data
      }
    })
    .catch(function(err) {
      console.log(err)
    })
}

function updateQuantity(product, quantity, $http, shopname) {
  console.log(shopname)
  const data = {
    quantity: quantity
  }
  const selected_data = {
    product: product,
    quantity: quantity
  }
  SaveDataToLocalStorage(selected_data)
  return $http.put('/api/updateProductById/' + product._id, data)
    .then(function(res) {
      if(res.data.message == 'success') {
        $('#checkboxes').find('.enter_quantity').css('display', 'none')
        return
      }
    })
    .catch(function(err) {
      console.log(err)
    })
}

function SaveDataToLocalStorage(data) {
  let temp = []
  temp = JSON.parse(localStorage.getItem('session'))
  if(temp == null) {
    temp = []
    temp.push(data)
    localStorage.setItem('session', JSON.stringify(temp));
  } else {
    temp.push(data)
    localStorage.setItem('session', JSON.stringify(temp));
  }
}

function printData() {
  var originalContents = $("body").html();
  var printContents = $("#printThisElement").html();
  $("body").html(printContents);
  window.print();
  $("body").html(originalContents);
  return false;
}