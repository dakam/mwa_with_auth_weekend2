angular.module("meanPatchManager").controller("singlePatchController", singlePatchController);

function singlePatchController(patchFactory,  $routeParams, $location,$window,$scope) {

    const vm = this;
    let id = $routeParams.id;
    vm.err = false;
    vm.error = "";
    
        
        patchFactory.getOne(id).then(function(response) {

        vm.patch = response.data;
        
       
    })

  
    vm.checkClientNumber = function(clients) {
        if(clients.length >0) {
            return true;
        } else {
            return false;
        }
    }


}


    