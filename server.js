// John Kim | University of Richmond | Scraping NY Times

// Node Dependencies

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");

const Note = require("./models/Note.js");
const Article = require("./models/Article.js");
const Save = require("./models/Save.js");

const logger = require("morgan");
const exphbs = require("express-handlebars");

const cheerio = require("cheerio");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Parse application/x-www-form-urlencoded
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("./public"));


// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB

    // this controls the scraping
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

const db = mongoose.connection;
db.on('error', err => {
    console.log('Mongoose Error', err);
});
db.once('open', () => {
    console.log("Mongoose connection is successful");
});

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

require("./routes/scrape.js")(app);
require("./routes/html.js")(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
