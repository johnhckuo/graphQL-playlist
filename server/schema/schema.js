const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// dummy data
var books = [
  { name: 'Name of the Wind', genre:'Fantasy', id:'1', authorId:'3'},
  { name: 'The Final Empire', genre:'Fantasy', id:'2', authorId:'1'},
  { name: 'The Long Earth', genre:'Sci-FI', id:'3', authorId:'2'},
]

var authors = [
  { name: 'John', age:45, id:'1'},
  { name: 'Bill', age:32, id:'2'},
  { name: 'Steve', age:30, id:'3'},
]

// data type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authors:{
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, {id: parent.authorId})
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        // code to get data from db / other source
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: { id : { type : GraphQLID } },
      resolve(parent, args){
        return _.find(authors, {id : args.id})
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
})
