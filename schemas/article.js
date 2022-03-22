const mongoose = require("mongoose");

const articlesSchema = mongoose.Schema({
    articleId: {
        type: Number,
        required: true,
        unique: true,
    },
    writer: {
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    date:{
        type: String,
    },
});

module.exports = mongoose.model("Articles", articlesSchema);