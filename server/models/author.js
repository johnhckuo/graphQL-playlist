const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
})


// create a collection called Author, and have a collection of objects which follow the author schema
module.exports = mongoose.model("Author", authorSchema)
