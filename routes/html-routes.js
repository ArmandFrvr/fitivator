// Routes for each page we'll need

//Dependencies
var path = require("path");

//Routes
//========================================
module.exports = function(app) {
    app.get("/", function(req,res) {
        res.sendFile(path.join(__dirname, "..public/index.html"));
    });

    app.get("/profile", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/profile1.html"));
    });

    app.get("/dashboard", function(req, res){
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));
    });
};