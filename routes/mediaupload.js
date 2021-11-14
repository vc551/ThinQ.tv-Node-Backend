// Express Imports
var express = require("express");
var router = new express.Router();

// JSON Data files for navbarItems
var navbarItems = require("../json/navbarItems.json");

// File Manipulation Imports
var formidable = require("formidable");
var path = require("path");

// GET route for main page
router.get("/", (req, res) => {
    res.render("mediaupload.ejs", {navbarItems: navbarItems, success: false, error: false});
});

// POST route for uploading media
router.post("/", (req, res, next) => {
    const form = formidable({
        uploadDir: path.join(require('os').homedir(), "/Media"),
        multiples: true,
        keepExtensions: true,
        maxFileSize: 1 * 1024 * 1024 * 1024
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            res.render("mediaupload.ejs", {navbarItems: navbarItems, success: false, error: true});
        }
        console.log("Uploaded Files: ", files);
        res.render("mediaupload.ejs", {navbarItems: navbarItems, success: true, error: false});
    });
});

// Export the module router
module.exports = router;