angular.module("meanGames", ['ngRoute', 'angular-jwt']).config(config);

function config($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");

    $routeProvider.when("/", {
        templateUrl:"angular-app/welcome/welcome.html",
        access: {restricted: false}
    }).when("/games", {

        templateUrl:"angular-app/gamesList/games.html",
        controller:"gamesController",
        controllerAs:"vm",
        access: {restricted: false}
    }).when("/games/:id", {
        templateUrl:"angular-app/singleGame/singlegame.html",
        controller:"singleGameController",
        controllerAs:"vm",
        access: {restricted: false}

    }).when("/register", {
        templateUrl:"angular-app/register/register.html",
        controller:"RegisterController",
        controllerAs:"vm",
        access: {restricted: false}
    }).when("/profile", {
        templateUrl:"angular-app/profile/profile.html",
        access: {restricted: true}
    }).otherwise({
        redirectTo: "/"
    })

}

function run($rootScope,  $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if(nextRoute.access !== undefined && 
            nextRoute.access.restricted && 
            !AuthFactory.auth && !$window.sessionStorage.token) { 
            event.preventDefault();
            $location.path("/");
        }
    })
}