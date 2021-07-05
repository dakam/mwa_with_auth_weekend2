angular.module("meanGames").factory("AuthFactory", AuthenticateFactory);

function AuthenticateFactory() {

    let auth = false;

    return {
        auth: auth
    };
}