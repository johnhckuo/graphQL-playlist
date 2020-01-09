const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// dummy data
var books = [
  { name: 'Name of the Wind', genre:'Fantasy', id:'1', authorId:'3'},
  { name: 'The Final Empire', genre:'Fantasy', id:'2', authorId:'1'},
  { name: 'The Long Earth', genre:'Sci-FI', id:'3', authorId:'2'},
  { name: 'Name of the Wind 2', genre:'Fantasy', id:'1', authorId:'3'},
  { name: 'The First Empire', genre:'Fantasy', id:'2', authorId:'1'},
  { name: 'The Explosion', genre:'Sci-FI', id:'3', authorId:'2'},
]

var authors = [
  { name: 'John', age:45, id:'1'},
  { name: 'Bill', age:32, id:'2'},
  { name: 'Steve', age:30, id:'3'},
]

// data type
const BookType = new GraphQLObjectType({
  name: 'Book',
  // wrap the fields as a function instead of an object, so that it will only be execute after this whole file is read
  // or else it will shows AuthorType undefined since it is not declared above this BookType
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
    age: { type: GraphQLInt },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books, {authorId: parent.id});
      },
    }
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
})
