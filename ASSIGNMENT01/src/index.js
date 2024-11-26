const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const path = require("path");
const createError = require("http-errors");
const app = express();
const port = process.env.PORT || 3000;
const config = require("./database/config");
const ContactUsData = require("./models/project");

mongoose.set("strictQuery", false);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set the path for views and partials
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials");

// Connect to MongoDB
mongoose
  .connect(config.ConnectionStrings.MongoDB)
  .then(() => {
    console.log("Connected to MongoDB");

    // Set view engine and views directory
    app.set("view engine", "hbs");
    app.set("views", viewsPath);

    // Serve static files
    app.use("/public", express.static(path.join(__dirname, "../public")));
    app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
    app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));

    // Register partials
    hbs.registerPartials(partialsPath);

    // Middleware to handle `.hbs` extensions
    app.use((req, res, next) => {
      if (req.url.endsWith(".hbs")) {
        const newUrl = req.url.replace(".hbs", "");
        return res.redirect(newUrl);
      }
      next();
    });

    // Routes
    app.get("/", (req, res) => {
      res.render("home");
    });

    app.get("/projects", (req, res) => {
      res.render("projects");
    });

    app.get("/about", (req, res) => {
      res.render("about");
    });

    // POST route to handle form submissions
    app.post("/projects", (req, res) => {
      const { name, email, interest, message } = req.body;

      const newContact = new ContactUsData({
        name,
        email,
        interest,
        message,
      });

      newContact
        .save()
        .then(() => {
          res.redirect("/"); // Redirect to the projects page
        })
        .catch((err) => {
          console.error("Error saving project:", err);
          res.status(500).send("An error occurred while saving your project.");
        });
    });

    // Catch 404 and forward to error handler
    app.use((req, res, next) => {
      next(createError(404));
    });

    // Error handler
    app.use((err, req, res, next) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};
      res.status(err.status || 500);
      res.render("error");
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error Connecting to MongoDB:", err.message);
  });
