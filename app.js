// Express Imports
var express = require("express");
var app = express();

// HTTPS Imports
var https = require("https");
var fs = require("fs")

// Server Ports
var http_port = 80;
var https_port = 443;

// JSON Data files for embeddedURLs and navbarItems
var embeddedURLs = require("./json/embeddedURLs.json");
var navbarItems = require("./json/navbarItems.json");

// Routes
var mediaUploadRoutes = require("./routes/mediaupload");
var mediaManageRoutes = require("./routes/mediamanage");

// Create Symlink to Access Media Files
fs.symlink(require('os').homedir() + "/Media/",__dirname + "/public/Media", (err) =>  console.log(err));

// ExpressJS setup
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))

// Home Route
app.get("/", (req, res) => {
    res.render("home.ejs", {navbarItems: navbarItems});
});

// Feedback Form Route
app.get("/feedbackform", (req, res) => {
    res.render("pageWithEmbeddedView.ejs", {navbarItems: navbarItems, pageName: "Feedback Form", embeddedURL: embeddedURLs.feedbackform});
});

// Documentation Route
app.get("/documentation", (req, res) => {
    res.render("pageWithEmbeddedView.ejs", {navbarItems: navbarItems, pageName: "Documentation", embeddedURL: embeddedURLs.documentation});
});

// Media Upload Routes
app.use("/mediaupload", mediaUploadRoutes);

// Media Manage Routes
app.use("/mediamanage", mediaManageRoutes);

// HTTPS Redirect
app.use((req, res, next) => {
    if (!req.secure) {
       return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
});

// HTTP Server on Default Port 80
app.listen(process.env.PORT||http_port,process.env.IP, () => {
    console.log("Server started on port "+http_port);
});

// HTTPS Server on Default Port 443 
// ** WILL NOT RUN IF 'server.cert' AND 'server.key' FILES ARE NOT PRESENT IN THE 'cert' FOLDER
try {
    var https_options = { key: fs.readFileSync('./cert/server.key'), cert: fs.readFileSync('./cert/server.cert')};
    https.createServer(https_options, app).listen(https_port, () => {
        console.log("Server started on port "+https_port);
    });
} catch (err) {
    console.log("Error in Reading Certificate Files", err);
}