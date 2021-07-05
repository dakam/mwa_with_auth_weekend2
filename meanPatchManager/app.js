const express = require("express");
const path = require("path");
require("./api/data/db");
const router = require("./api/routes");
const app = express();
app.set("PORT", 8080);

app.use("/", function(req, res, next) {
    console.log(`Received a ${req.method} with URL ${req.url}`);
    next();
})


app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));


app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules/", express.static(path.join(__dirname, "node_modules")));

app.use("/api", router);

const patchServer = app.listen(app.get("PORT"), function() {
    const PORT = patchServer.address().port;
    console.log(`LISTENING ON PORT  ${PORT}`);
})


