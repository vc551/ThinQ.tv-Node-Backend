var express = require("express");
var router = new express.Router();

var navbarItems = require("../json/navbarItems.json");

var formidable = require("formidable");
var path = require("path");

router.get("/", (req, res) => {
    res.render("mediaupload.ejs", {navbarItems: navbarItems, success: false, error: false});
});

router.post("/", (req, res, next) => {
    const form = formidable({
        uploadDir: path.join(require('os').homedir(), "/Media"),
        multiples: true,
        keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            res.render("mediaupload.ejs", {navbarItems: navbarItems, success: false, error: true});
        }
        console.log("Uploaded Files: ", files);
        res.render("mediaupload.ejs", {success: true, error: false});
    });
});

module.exports = router