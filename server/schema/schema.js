const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

/*
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
*/

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
        //return _.find(authors, {id: parent.authorId})
        // author model is how we interacted with author collection
        return Author.findById(parent.authorId)
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
        //return _.filter(books, {authorId: parent.id});
        return Book.find({authorId: parent.id})
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
        //return _.find(books, {id: args.id})
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id : { type : GraphQLID } },
      resolve(parent, args){
        //return _.find(authors, {id : args.id})
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return books
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        //return authors
        return Author.find({})
      }
    }
  }
});

// mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields:{
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save();
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
