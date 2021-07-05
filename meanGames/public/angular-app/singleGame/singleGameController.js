angular.module("meanGames").controller("singleGameController", singleGameController);

function singleGameController(gameFactory,  $routeParams, $scope, $location) {

    const vm = this;
    let id = $routeParams.id;

    vm.err = false;
    vm.error = "";

    
    function _getStarRating(stars) {
        return new Array(stars).fill(1);
        }
        
    gameFactory.getOne(id).then(function(response) {

        vm.game = response.data;
        
        vm.starsArray= _getStarRating(vm.game.rate);
    })

    vm.deleteGame = function(gameId) {

        console.log("gameId", id)

        if(gameId && gameId.length==24 ) {

            gameFactory.deleteGame(gameId).then(function(response) {

                vm.err = false;
                vm.error = "";
                console.log("Game Deleted", response)
                $location.path("/");

            }).catch(function(error) {

                vm.err = true;
                vm.error = error;

                
            })

        } else {

            vm.err = true;
            vm.error = "GameId no found, please try again"


        }
    }
}


    