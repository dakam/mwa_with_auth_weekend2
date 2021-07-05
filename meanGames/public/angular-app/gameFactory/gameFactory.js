angular.module("meanGames").factory("gameFactory", gameFactory);

function gameFactory($http) {

    return {
        getAll: getAllGames,
        getOne: getOneGame,
        addGame: addOneGame,
        deleteGame:deleteOneGame
     
    }


    function deleteOneGame(gameId) {

        return $http.delete("/api/games/"+gameId).then(complete).catch(failed);

    }

    function addOneGame(newGame) {
        return $http.post("/api/games", newGame).then(complete).catch(failed);

    }
    function getAllGames() {
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(gid) {

        return $http.get("/api/games/"+gid).then(complete).catch(failed);
    }
    
    function complete(response) {
    
        console.log(response)
    
        return response;
      
    }
    
    function failed(error) {

        console.log(error)
        return error.status.statusText;
    }
}

