const graphql = require("graphql");
const Book = require("../models/book");
let Author = require("../models/author");

// //dummy data 
// let books = [
//   { name: "Name of the wind", genre: "fantasy", id: "1", authorid: "1" },
//   { name: "the final empire", genre: "since fiction", id: "2", authorid: "2" },
//   { name: "the long earth", genre: "Sci-fi", id: "3", authorid: "3" },
//   { name: "the Hero of Ages", genre: "fantasy", id: "4", authorid: "2" },
// ];
// let authors = [
//   { name: "patrick rothfuss", age: "44", id: "1" },
//   { name: "Brandon Sanderson", age: "42", id: "2" },
//   { name: "Terry Pratcchett", age: "66", id: "3" },
// ];

const BookType = new graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    genre: { type: graphql.GraphQLString },
    //relation between book and his author
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log(parent);
        return Author.findById(parent.authorid);
      },
    },
  }),
});
const AuthorType = new graphql.GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt },
    //relation between author and his books
    books: {
      type: graphql.GraphQLList(BookType),
      resolve(parent, args) {
        // return Book.find((book) => book.authorid === parent.id);
        return Book.find({ authorid: parent.id });
      },
    },
  }),
});
const RootQuery = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: graphql.GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: graphql.GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },

    books: {
      type: graphql.GraphQLList(BookType),
      resolve() {
        return Book.find({});
      },
    },

    authors: {
      type: graphql.GraphQLList(AuthorType),
      resolve() {
        return Author.find({});
      },
    },
  },
});
const mutation = new graphql.GraphQLObjectType({
  name: "mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        age: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve(parent, args) {
        let authorInsstance = new Author({
          name: args.name,
          age: args.age,
        });

        return authorInsstance.save();
        // .then((result) => {
        //   console.log(result);
        //   return result
        // })
        // .catch((err) => {
        //   console.log("message error is ");
        //   console.log(err);
        // });
      },
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        genre: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        authorid: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
      },
      resolve(parent, args) {
        let bookInstance = new Book({
          name: args.name,
          genre: args.genre,
          authorid: args.authorid,
        });
        return bookInstance.save();
      },
    },
  },
});

let schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});

module.exports = schema;
