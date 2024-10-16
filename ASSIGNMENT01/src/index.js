const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require('path');
const port = process.env.PORT || 3000; 

// Set the path for views and partials
const viewsPath = path.join(__dirname, '../views'); 
const partialsPath = path.join(__dirname, '../views/partials'); 

// Set view engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Serve static files like CSS, JS, and images
app.use('/public', express.static(path.join(__dirname, "../public")));
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));

// Register partials, if you use any
hbs.registerPartials(partialsPath);
app.use((req, res, next) => {
    if (req.url.endsWith(".hbs")) {
        const newUrl = req.url.replace(".hbs", "");
        return res.redirect(newUrl);
    }
    next();
});

// Route for home page
app.get("/", (req, res) => {
    res.render("home");
});

// Route for projects page
app.get("/projects", (req, res) => {
    res.render("projects");
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
