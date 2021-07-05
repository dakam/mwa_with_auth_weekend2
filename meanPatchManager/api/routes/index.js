const express = require("express");
const {PatchesGetOne, PatchesGetAll,PatchesAddOne,PatchesFullUpdateOne,
PatchesPartialUpdateOne,PatchesDeleteOne } = require("../controllers/patchesController");
const loginCont = require("../controllers/usersController")


const{ClientsGetAll,ClientsAddOne,ClientsGetOne,ClientsFullUpdateOne,ClientsPartialUpdateOne,ClientsDeleteOne} = require("../controllers/clientsController")

const router = express.Router();

router.route("/patches")
.get(PatchesGetAll)
.post(loginCont.authenticate,PatchesAddOne);

router.route("/patches/:patchId")
.get(PatchesGetOne)
.put(loginCont.authenticate,PatchesFullUpdateOne)
.patch(loginCont.authenticate,PatchesPartialUpdateOne)
.delete(loginCont.authenticate,PatchesDeleteOne)

router.route("/patches/:patchId/clients")
.get(ClientsGetAll)
.post(loginCont.authenticate,ClientsAddOne)

router.route("/patches/:patchId/clients/:clientId")
.get(ClientsGetOne)
.put(loginCont.authenticate,ClientsFullUpdateOne)
.patch(loginCont.authenticate,ClientsPartialUpdateOne)
.delete(loginCont.authenticate,ClientsDeleteOne);


router.route("/users/register")
.post(loginCont.Register)


router.route("/users/login")
.post(loginCont.Login)



module.exports = router;