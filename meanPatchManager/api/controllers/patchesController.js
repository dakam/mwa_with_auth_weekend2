
const mongoose = require("mongoose");
const Patch = mongoose.model("Patch");

module.exports.PatchesGetAll = function(req, res) {

    let offset=  0;
    let count =7;
    let countMax =7;


    if(req.query && req.query.search) {
        let search = req.query.search;
        Patch.find({$text: {$search: search}}).exec(function(error, patches) {
            const response = {
                status:200,
                message:patches,
            }
    
           console.log("in search", patches)
            if(error) {
                response.status = 500;
                response.message=error;
            } else if(!patches) {
                response.status= 400;
                response.message= "No patches found";
            } 
    
            res.status(response.status).json(response.message);
           
        })
    
    } else {


    if(req.query && req.query.offset && req.query.count) {

        offset=  parseInt(req.query.offset,0);
        count =parseInt(req.query.count, countMax);
    }
 
Patch.find().skip(offset).limit(count).exec(function(err, patches) {
    const response = {
        status: 200,
        message: patches,
    }

    if(err) {
        response.status = 500;
        response.message = err
    } else if(!patches) {

        response.status = 404;
        response.message = "We did not get any Patches"
    }

    res.status(response.status).json(response.message);
})

}
}

module.exports.PatchesGetOne = function(req, res) {

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
                response.status = 200;
                response.message = err;
            } else if(! patch) {
    
                response.status = 404;
                response.message = "Patch Not found";
    
            }
            res.status(response.status).json(response.message);
            return;
        })
    }

}

module.exports.PatchesAddOne = function(req, res) {

    if(!req) {
        let message = "No Request to creat a Patch was received";
        console.log(message)
        res.status(400).json({"message": message})
        return;
    }

    const newPatch = {
        name: req.body.name,
        description: req.body.description,
        vendor: req.body.vendor,
        year: parseInt(req.body.year),
        clients: []

    }

    Patch.create(newPatch, function(err, patch) {

        const response = {
            status: 201,
            message: patch,
        }
    
        if(err) {
            response.status = 500;
            response.message = err
            console.log("error posting a Patch",err)
        } 

        res.status(response.status).json(response.message);

    }) 
}

module.exports.PatchesFullUpdateOne = function(req, res) {

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
                response.message = "Patch Not found";
    
            }
            if(response.status !=200) {

                res.status(response.status).json(response.message);
            } else {

                patch.name= req.body.name;
                patch.description= req.body.description;
                patch.vendor= req.body.vendor;
                patch.year= parseInt(req.body.year);

                patch.save(function(err, updatedPatch) {

                    const response = {
                        status: 202,
                        message: patch,
                    }
                   console.log("Updated Patch", updatedPatch)
                    if(err) {
                        response.status = 500;
                        response.message = err
                        console.log("error Updating a Patch",err)
                    } 
            
                    res.status(response.status).json(response.message);


                })

                

            }
          
           
        })

    }

}

module.exports.PatchesPartialUpdateOne = function(req, res) {

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
                response.message = "Patch Not found";
    
            }
            if(response.status !=200) {

                res.status(response.status).json(response.message);
            } else {


                if(req.body.name) {
                    patch.name= req.body.name;
                }
                if(req.body.description) {
                    patch.description= req.body.description;
                }
                if(req.body.vendor) {
                    patch.vendor= req.body.vendor;
                }
                if(req.body.year) {
                    patch.year= req.body.year;
                }

                patch.save(function(err, updatedPatch) {

                    const response = {
                        status: 202,
                        message: patch,
                    }
                   console.log("Partial Patch Update", updatedPatch)
                    if(err) {
                        response.status = 500;
                        response.message = err
                        console.log("error Partially Updating a Patch",err)
                    } 
            
                    res.status(response.status).json(response.message);


                })               

            }
          
           
        })

    }

}


module.exports.PatchesDeleteOne = function(req, res) {

    const patchId = req.params.patchId;
    const patchIdLen =24;
    let message = "PatchId received is not valid";
    if(patchId.length !=patchIdLen) {
        console.log(message);
        res.status(400).json({"Message": message});
        return;
    } else {
        Patch.findByIdAndRemove(patchId).exec(function(err, deletedPatch) {
            const response = {
                status: 202,
                message: deletedPatch,
            }
            if(err) {
                response.status = 500;
                response.message = err;
            } else if(! deletedPatch) {
    
                response.status = 404;
                response.message = "Patch is Not found for deletion";
            }
                res.status(response.status).json(response.message);

        })

    }

}