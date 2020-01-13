const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema")
const mongoose = require("mongoose")
const cors = require('cors');
require('dotenv').config()

const app=express();

// allow cross-origin rewquests
app.use(cors());

// connect to database
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds261648.mlab.com:61648/graphql-test`);
mongoose.connection.once("open", () => {
  console.log("connected to database");
})

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("now listening for request on port 4000...")
});
