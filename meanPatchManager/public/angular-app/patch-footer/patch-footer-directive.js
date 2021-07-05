angular.module("meanPatchManager").directive("patchFooter", PatchFooter);

function PatchFooter() {

    return {
        retrict: "E",
        templateUrl:"angular-app/patch-footer/patch-footer.html",
    }

}