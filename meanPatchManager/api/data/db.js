const mongoose= require("mongoose");
require("./patches-model");
require("./users-model")

const dbName= "meanPatchManager";
const dbURL ="mongodb://localhost:27017/"+dbName;

mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true}, function(err, client) {
    if(err) {
        console.log("An error occured during db Connection, Ooooops", err)

    } else {
        console.log("Connected to the Mongodb ");
    }
})

mongoose.connection.on("connected", function() {
    console.log("Connected to The DB")
})

mongoose.connection.on("disconnected", function() {
    console.log("Connected to The DB")
})
mongoose.connection.on("disconnected", function() {
    console.log("DisConnected from The DB")
})

mongoose.connection.on("error", function() {
    console.log("Error Received from the database")
})

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("Send disconncet to mongoose because of application termination");
        process.exit(0);
    })
})

process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log("Send disconncet to mongoose because of application termination");
        process.exit(0);
    })
})

process.on("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log("Send disconncet to mongoose because of application restart");
        process.kill(process.pid, "SIGUSR2");
    })
})



