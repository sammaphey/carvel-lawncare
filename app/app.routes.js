app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider


        .when('/services', {
            templateUrl: 'app/services/services.html',
            controller: 'service'
        })

        .when('/about', {
            templateUrl: 'app/about/about.html',
            controller: 'about'
        })

        .otherwise({
            templateUrl: 'app/home/home.html',
            controller: 'home'
        });
});
