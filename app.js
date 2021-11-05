// import 'media-slideshow-component';
var express = require("express");
var app = express();

var formidable = require("formidable");

var port = 80;

var sources = "https://picsum.photos/480/640";

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))

app.get("/", (req, res) => {
    res.render("home.ejs", {sources:sources});
});

app.get("/mediaupload", (req, res) => {
    res.render("mediaupload.ejs");
});

app.post("/mediaupload", (req, res, next) => {
    const form = formidable({ });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log(fields, files );
    });
  });

app.listen(process.env.PORT||port,process.env.IP,()=>{
    console.log("Server started on port "+port);
});