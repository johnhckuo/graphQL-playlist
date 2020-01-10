const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
})


// create a collection called Book, and have a collection of objects which follow the book schema
module.exports = mongoose.model("Book", bookSchema)
