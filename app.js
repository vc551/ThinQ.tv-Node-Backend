var express = require("express");
var app = express();

var embeddedURLs = require("./json/embeddedURLs.json");
var navbarItems = require("./json/navbarItems.json");

var mediaUploadRoutes = require("./routes/mediaupload");

var port = 80;

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))

app.get("/", (req, res) => {
    res.render("home.ejs", {navbarItems: navbarItems});
});

app.get("/feedbackform", (req, res) => {
    res.render("pageWithEmbeddedView.ejs", {navbarItems: navbarItems, pageName: "Feedback Form", embeddedURL: embeddedURLs.feedbackform});
});

app.get("/documentation", (req, res) => {
    res.render("pageWithEmbeddedView.ejs", {navbarItems: navbarItems, pageName: "Documentation", embeddedURL: embeddedURLs.documentation});
});

app.use("/mediaupload", mediaUploadRoutes);

app.listen(process.env.PORT||port,process.env.IP,()=>{
    console.log("Server started on port "+port);
});