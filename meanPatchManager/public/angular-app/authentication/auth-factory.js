angular.module("meanPatchManager").factory("AuthFactory", AuthenticateFactory);

function AuthenticateFactory() {

    let auth = false;
    let user ="";

    return {
        auth: auth,
        getLoggedInUser


    };

    function getLoggedInUser() {
        return user;
    }

   
}