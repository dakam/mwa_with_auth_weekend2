angular.module("meanPatchManager").controller("addpatchController", addpatchController);

function addpatchController(patchFactory) {

    const vm = this;
    vm.success= false;
    vm.err = false;

    console.log("getting to add controller");



    vm.addPatch = function() {

        if(vm.name && vm.description && vm.vendor && vm.year) {

            const newPatch = {
                name: vm.name,
                description: vm.description,
                vendor: vm.vendor,
                year: vm.year,
            }
    
          

            patchFactory.addPatch(newPatch).then(function(response) {
           
                vm.success = true;
                vm.err = false;
                vm.message = "New Patch details added to the database, Thank you";
                console.log("Response from API", response)
                vm.name ="";
                vm.description="";
                vm.vendor="";
                vm.year=""

             
            }).catch(function(error) {

            })
    
        }  else {
            vm.err = true;
            vm.error = "Please enter all fields to continue"
        }

    }




}