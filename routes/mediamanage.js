// Express Imports
var express = require("express");
var methodOverride = require("method-override");
var router = new express.Router();
router.use(methodOverride("_method"));

// JSON Data files for mediaTypes and navbarItems
var navbarItems = require("../json/navbarItems.json");
var mediaTypes = require("../json/mediaTypes.json")

// Imports and variables for media files saved in a dictionary in the form of (FILENAME) -> ['Image' or 'Video' , File Size as a Human Readable string]
var fs = require("fs")
var path = require("path");
var fileList = new Map();

// Update fileList map
fs.readdir(path.join(require('os').homedir(), "/Media"), (err, files) => {
    if (err) {
        console.log(err);
    } else {
        fileList = new Map();
        files.forEach(file => {
            var size = require("pretty-bytes")(fs.statSync(path.join(require('os').homedir(), "/Media",file)).size);
            if(mediaTypes.images.includes(path.extname(file).toLowerCase())) {
                fileList.set(file, ['Image', size]);
            } else if(mediaTypes.videos.includes(path.extname(file).toLowerCase())) {
                fileList.set(file, ['Video', size]);
            }
        });
    }
});

// GET route for main page
router.get("/", (req, res) => {
    fs.readdir(path.join(require('os').homedir(), "/Media"), (err, files) => {
        if (err) {
            console.log(err);
        } else {
            fileList = new Map();
            files.forEach(file => {
                var size = require("pretty-bytes")(fs.statSync(path.join(require('os').homedir(), "/Media",file)).size);
                if(mediaTypes.images.includes(path.extname(file).toLowerCase())) {
                    fileList.set(file, ['Image', size]);
                } else if(mediaTypes.videos.includes(path.extname(file).toLowerCase())) {
                    fileList.set(file, ['Video', size]);
                }
            });
        }
    });
    res.render("mediamanage.ejs", {navbarItems: navbarItems, fileList: fileList});
});

// GET route for particular media file
router.get("/:id", (req, res) => {
    res.render("mediamanageWithEmbeddedView", {navbarItems: navbarItems, fileName: req.params.id, fileInfo: fileList.get(req.params.id)})
});

// DELETE route for particular media file
router.delete("/:id", (req, res) => {
    // console.log(path.join(require('os').homedir(), "/Media",req.params.id));
    fs.unlinkSync(path.join(require('os').homedir(), "/Media",req.params.id), (err) => {
        console.log(err);
    });
    fileList.delete(req.params.id)
    res.redirect("/mediamanage/")
});

// Export the module router
module.exports = router;