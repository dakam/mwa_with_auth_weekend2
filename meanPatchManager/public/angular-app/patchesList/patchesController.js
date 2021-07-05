angular.module("meanPatchManager").controller("patchesController", patchesController);

function patchesController(patchFactory, $location) {
    const vm = this;
    vm.searching = false;

    patchFactory.getAll().then(function(response) {

        console.log(response);
        vm.patches = response.data;
    })

    vm.showSearch = function() {
        vm.searching = !vm.searching;

    }

    vm.searchPatches = function() {
        patchFactory.getAll(vm.searchText).then(function(response) {
            vm.patches= response.data;
            console.log("after search", response.data)
       
        }) 
    
        }

    vm.deletePatch = function(patchId) 
    { 
        if (confirm("Are you sure you want to delete this Patch?, action can not be reversed"))
        {
            console.log("patchId to delete", patchId)

            patchFactory.deletePatch(patchId).then(function(response) {
    
              
               
                $location.path("/");
    
            }).catch(function(error) {
    
                
                
            })

        } else {

         console.log("user not allowed", patchId)

        }
   }

    
}