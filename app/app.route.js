app.config(function($routeProvider, $locationProvider) {
    // $locationProvider.hashPrefix('');
    $routeProvider


        .when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'homeCtrl'
        })


        .when('/about', {
            templateUrl: 'app/about/about.html',
            controller: 'aboutCtrl'
        })


        .when('/contact', {
            templateUrl: 'app/contact/contact.html',
            controller: 'contactCtrl'
        })

        .when('/portfolio', {
            templateUrl: 'app/portfolio/portfolio.html',
            controller: 'portfolioCtrl'
        })


        .when('/services', {
            templateUrl: 'app/services/services.html',
            controller: 'servicesCtrl'
        })

        .otherwise({
          templateUrl: 'app/home/home.html',
          controller: 'homeCtrl'
        });
});
