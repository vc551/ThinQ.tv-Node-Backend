var express = require("express");
var app = express();

var https = require("https");
var fs = require("fs")

var embeddedURLs = require("./json/embeddedURLs.json");
var navbarItems = require("./json/navbarItems.json");

var mediaUploadRoutes = require("./routes/mediaupload");

var http_port = 80;
var https_port = 443;
var https_options = { key: fs.readFileSync('./cert/server.key'), cert: fs.readFileSync('./cert/server.cert')};

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

app.use((req, res, next) => {
    if (!req.secure) {
       return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
});

app.listen(process.env.PORT||http_port,process.env.IP,()=>{
    console.log("Server started on port "+http_port);
});

https.createServer(https_options, app).listen(https_port, () => {
    console.log("Server started on port "+https_port);
});