// import 'media-slideshow-component';
const { localsName } = require("ejs");
var express = require("express");
var app = express();

var formidable = require("formidable");
var path = require("path");
var fs = require('fs');

var port = 80;

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/mediaupload", (req, res) => {
    res.render("mediaupload.ejs", {success: false, error: false});
});

app.post("/mediaupload", (req, res, next) => {
    const form = formidable({
        uploadDir: path.join(__dirname, "/uploads"),
        multiples: true,
        keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            res.render("mediaupload.ejs", {success: false, error: true});
        }
        console.log("Uploaded Files: ", files);
        res.render("mediaupload.ejs", {success: true, error: false});
    });
});

app.listen(process.env.PORT||port,process.env.IP,()=>{
    console.log("Server started on port "+port);
});