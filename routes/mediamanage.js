// Express Imports
var express = require("express");
var router = new express.Router();

// JSON Data files for mediaTypes and navbarItems
var navbarItems = require("../json/navbarItems.json");
var mediaTypes = require("../json/mediaTypes.json")

var fileList = new Map();

var fs = require("fs")
var path = require("path");

// GET route for main page
router.get("/", (req, res) => {
    fs.readdir(path.join(require('os').homedir(), "/Media"), (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file => {
                var size = require("pretty-bytes")(fs.statSync(path.join(require('os').homedir(), "/Media",file)).size);
                if(mediaTypes.images.includes(path.extname(file).toLowerCase())) {
                    fileList.set("/Media/"+file, ['image', size]);
                } else if(mediaTypes.videos.includes(path.extname(file).toLowerCase())) {
                    fileList.set("/Media/"+file, ['video', size]);
                }
            });
        }
    });
    res.render("mediamanage.ejs", {navbarItems: navbarItems, fileList: fileList});
});

// GET route for particular media file
router.get("/:id", (req, res) => {

});

// DELETE route for particular media file
router.delete("/:id", (req, res) => {

});

// Export the module router
module.exports = router;