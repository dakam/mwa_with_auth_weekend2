
const mongoose = require("mongoose");
const Patch = mongoose.model("Patch");

module.exports.ClientsGetAll = function(req, res) {

    const patchId = req.params.patchId;
    const patchIdLen =24;
    let message = "PatchId received is not valid";
    if(patchId.length !=patchIdLen) {
        console.log(message);
        res.status(400).json({"Message": message});
        return;
    } else {

        Patch.findById(patchId).exec(function(err, patch) {
            const response = {
                status: 200,
                message: patch.clients,
            }
            if(err) {
                response.status = 500;
                response.message = err;
            } else if(! patch) {
    
                response.status = 404;
                response.message = "Patch ID supplied is Not found hence unable to retireve Patch Clients";
    
            }

            res.status(response.status).json(response.message);
            return;
        })

    }

}
module.exports.ClientsAddOne = function(req, res) {
    const patchId = req.params.patchId;
    const patchIdLen =24;
    let message = "PatchId received is not valid";
    if(patchId.length !=patchIdLen) {
        console.log(message);
        res.status(400).json({"Message": message});
        return;
    } else {

        Patch.findById(patchId).exec(function(err, patch) {
            const response = {
                status: 200,
                message: patch,
            }
            if(err) {
                response.status = 500;
                response.message = err;
            } else if(! patch) {
    
                response.status = 404;
                response.message = "Patch to be updated is Not found";
            }
            if(response.status !=200) {

                res.status(response.status).json(response.message);
                return;
            } else {


                console.log("patch -", patch)

                patch.clients.push({"name":req.body.name, "os": req.body.os, "status":req.body.status})
            
                console.log("patch2 -", patch)

                patch.save(function(err, updatedPatch) {

                    console.log("patch3 -", err)
                    const response = {
                        status: 202,
                        message: updatedPatch.clients,
                    }
                   console.log("Updated Patch Clients", updatedPatch.clients)
                    if(err) {
                        response.status = 500;
                        response.message = err
                        console.log("error Updating a Patch Client",err)
                    }
                    else if(!updatedPatch) {

                        response.status = 400;
                        response.message = "Error Adding Patch clients, please ensure that is correct";
                    }
            
                    res.status(response.status).json(response.message);


                })  

            }
          
           
        })

    }

}

module.exports.ClientsGetOne = function(req, res) {

    const patchId = req.params.patchId;
    const clientId = req.params.clientId;
    const patchIdLen =24;
    let message = "PatchId OR Client ID received is not valid";
    if(patchId.length !=patchIdLen || clientId.length != patchIdLen) {

        console.log("pid="+patchId.length+"clientid="+clientId.length+message);
        res.status(400).json({"Message": message});
        return;
    } else {

        Patch.findById(patchId).exec(function(err, patch) {
            const response = {
                status: 200,
                message: patch.clients,
            }
            if(err) {
                response.status = 500;
                response.message = err;
            } else if(! patch) {
    
                response.status = 404;
                response.message = "Patch ID supplied is Not found hence unable to retireve Patch Clients";
            }
            if(response.status !=200) {
                res.status(response.status).json(response.message);
                return;
            }
             if(patch.clients) {

               let clients = patch.clients;
               let check=-1;
               for(let i=0;i<clients.length;i++) {          
                   if(clients[i]._id.equals(clientId)) {
                       check=i;
                   }
               }
               if(check > -1) {
                response.message= clients[check];
               } else {

                response.message= "ClientId is not found for this Patch";
               }
               res.status(response.status).json(response.message);

            }
           
        })



    }

}

module.exports.ClientsFullUpdateOne = function(req, res) {
    const patchId = req.params.patchId;
    const clientId = req.params.clientId;
    const patchIdLen =24;
    let message = "PatchId OR Client ID received is not valid";
    if(patchId.length !=patchIdLen || clientId.length != patchIdLen) {

        console.log("pid="+patchId.length+"clientid="+clientId.length+message);
        res.status(400).json({"Message": message});
        return;
    } else {

        if(!req.body.name || !req.body.os || !req.body.status) {

            let message = "Kindly supply Client name, Client OS and patch status";
            res.status(400).json({"Message": message});
            return;
        }

        Patch.findById(patchId).exec(function(err, patch) {
            const response = {
                status: 200,
                message: patch.clients,
            }
            if(err) {
                response.status = 500;
                response.message = err;
            } else if(! patch) {
    
                response.status = 404;
                response.message = "Patch ID supplied is Not found hence unable to retireve Patch Clients";
            }
            if(response.status !=200) {

                res.status(response.status).json(response.message);
                return;
            }
             if(patch.clients) {

               let clients = patch.clients;
               let check=-1;
               for(let i=0;i<clients.length;i++) {          
                   if(clients[i]._id.equals(clientId)) {
                       check=i;
                   }
               }
               if(check > -1) {
                response.message= clients[check];
                patch.clients[check] ={"name": req.body.name, "os":req.body.os, "status":req.body.status}
                patch.save(function(err, updatedPatch) {
                    response.message= updatedPatch.clients[check]
                    response.status = 202;
                    if(err) {
                        response.status = 500;
                        response.message = err;
                    } else if(! updatedPatch) {
            
                        response.status = 404;
                        response.message = "Unable to Save Client information";
                    }
                        res.status(response.status).json(response.message);
                        return;                    

                })

               } else {

                response.message= "ClientId is not found for this Patch";

                res.status(response.status).json(response.message);

               }
               

            }
           
        })
    }

}

module.exports.ClientsPartialUpdateOne = function(req, res) {

    const patchId = req.params.patchId;
    const clientId = req.params.clientId;
    const patchIdLen =24;
    let message = "PatchId OR Client ID received is not valid";
    if(patchId.length !=patchIdLen || clientId.length != patchIdLen) {

        console.log("pid="+patchId.length+"clientid="+clientId.length+message);
        res.status(400).json({"Message": message});
        return;
    } else {

        if(!req.body.name && !req.body.os && !req.body.status) {

            let message = "No single field was supplied to effect the Update Operation, Please try again";
            res.status(400).json({"Message": message});
            return;
        }

        Patch.findById(patchId).exec(function(err, patch) {
            const response = {
                status: 200,
                message: patch.clients,
            }
            if(err) {
                response.status = 500;
                response.message = err;
            } else if(! patch) {
    
                response.status = 404;
                response.message = "Patch ID supplied is Not found hence unable to retireve Patch Clients";
            }
            if(response.status !=200) {

                res.status(response.status).json(response.message);
                return;
            }
             if(patch.clients) {

               let clients = patch.clients;
               let check=-1;
               for(let i=0;i<clients.length;i++) {          
                   if(clients[i]._id.equals(clientId)) {
                       check=i;
                   }
               }
               if(check > -1) {
                response.message= clients[check];

                if(req.body.name) {

                    patch.clients[check].name = req.body.name;
                }
                if(req.body.os) {
                    patch.clients[check].os = req.body.os;
                    
                }
                if(req.body.status) {
                    patch.clients[check].status = req.body.status;
                    
                }
             
                patch.save(function(err, updatedPatch) {
                    response.message= updatedPatch.clients[check]
                    response.status = 202;
                    if(err) {
                        response.status = 500;
                        response.message = err;
                    } else if(! updatedPatch) {
            
                        response.status = 404;
                        response.message = "Unable to Save Client information";
                    }
                        res.status(response.status).json(response.message);
                        return;
                })

               } else {

                response.message= "ClientId is not found for this Patch";
                res.status(response.status).json(response.message);

               }
               

            }
           
        })



    }

}


module.exports.ClientsDeleteOne = function(req, res) {
    
    const patchId = req.params.patchId;
    const clientId = req.params.clientId;
    const patchIdLen =24;
    let message = "PatchId OR Client ID received is not valid";
    if(patchId.length !=patchIdLen || clientId.length != patchIdLen) {

        console.log("pid="+patchId.length+"clientid="+clientId.length+message);
        res.status(400).json({"Message": message});
        return;
    } else {

        Patch.findById(patchId).exec(function(err, patch) {
            const response = {
                status: 200,
                message: patch.clients,
            }
            if(err) {
                response.status = 500;
                response.message = err;
            } else if(! patch) {
    
                response.status = 404;
                response.message = "Patch ID supplied is Not found hence unable to retireve Patch Clients";
            }
            if(response.status !=200) {

                res.status(response.status).json(response.message);
                return;
            }
             if(patch.clients) {

               let clients = patch.clients;
               let check=-1;
               for(let i=0;i<clients.length;i++) {          
                   if(clients[i]._id.equals(clientId)) {
                       check=i;
                   }
               }
               if(check > -1) {
                response.message= clients[check];
                
                patch.clients[check].remove();
             
                patch.save(function(err, deletedPatch) {
               
                    response.message= deletedPatch.clients
                    response.status = 201;
                    if(err) {
                        response.status = 500;
                        response.message = err;
                    } else if(! deletedPatch) {
                                
                        response.status = 404;
                        response.message = "Unable to Delete Client information";
                    }
                    console.log(response);
                        res.status(response.status).json(response.message);
                        return;
                })

               } else {

                console.log(response);
                response.message= "ClientId is not found for this Patch, For deletion to happen";
                res.status(response.status).json(response.message);

               }
               

            }
           
        })



    }

}