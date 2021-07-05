angular.module("meanPatchManager").directive("patchNavigation", PatchNavigation);

function PatchNavigation() {

    return {
        restrict: "E",
        templateUrl:"angular-app/patch-navigation/patch-navigation.html"
    }
}