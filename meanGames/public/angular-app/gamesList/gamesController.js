angular.module("meanGames").controller("gamesController", gamesController);

function gamesController(gameFactory, AuthFactory) {
    const vm = this;


    gameFactory.getAll().then(function(response) {

        console.log(response);
        vm.games = response.data;
        console.log("games=",vm.games)
    })


    vm.isLoggedIn = function() {
        return AuthFactory.auth;
    }

    vm.addGame = function() {

        if(vm.title && vm.price && vm.year && vm.minAge && vm.rate && vm.minPlayers && vm.maxPlayers && vm.designers) {


            const newGame = {
                title: vm.title,
                price: vm.price,
                year: vm.year,
                minAge: vm.minAge,
                rate: vm.rate,
                minPlayers: vm.minPlayers,
                maxPlayers: vm.maxPlayers,
                designers: vm.designers,
              
            };


            gameFactory.addGame(newGame).then(function(response){

                vm.success=true;
                vm.err =false;
                vm.message= "Game has been added successfully";
                vm.title = "",
                vm.price="",
                vm.year="",
                vm.minAge="",
                vm.rate="",
                vm.minPlayers="",
                vm.maxPlayers="",
                vm.designers="",
                console.log(response);



            }).catch(function(error) {

                vm.success=false;
                vm.err=true;
                vm.error = error;


            })


        } else {


            vm.err=true;
            vm.error= "Please fill all fields";

        }

    }
    
}