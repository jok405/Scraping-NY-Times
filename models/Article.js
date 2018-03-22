

const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
  },
  byline: {
    type: String,
  },

  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;