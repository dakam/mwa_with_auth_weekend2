angular.module("meanPatchManager").controller("LoginController", LoginController);


function LoginController(UsersDataFactory, AuthFactory, $window, jwtHelper, $location) {
    const vm = this;
    vm.err = false;
    vm.error="";

    vm.isLoggedIn = function () {
      
        return AuthFactory.auth;
    };

    vm.login = function () {
        if (vm.username && vm.password) {
            const user = {
                username: vm.username,
                password: vm.password
            }

            UsersDataFactory.login(user).then(function (result) {

                    vm.err = false;
                    vm.error="";
             
               
                $window.sessionStorage.token = result.token;
                AuthFactory.auth = true;

               
                const token = $window.sessionStorage.token
                const decodedToken = jwtHelper.decodeToken(token);


                vm.loggedinUser = decodedToken.name;
                AuthFactory.user= decodedToken.name;

                vm.getLoggedIn = function () {
      
                    return AuthFactory.getLoggedInUser();
                };

                console.log("logged in user is ", decodedToken.name)
                vm.username = "";
                vm.password = "";
                $location.path("/")
            }).catch(function (error) {
                console.log("Error at login", error)


                vm.err = true;
                vm.error= "Unable to login at this time, please verify your credentials";
            })
        };
    };

    vm.logout = function () {
        AuthFactory.auth = false;
        delete $window.sessionStorage.token;
        $location.path("/");
    };

    vm.isActiveTab = function (url) {
        const currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }
}