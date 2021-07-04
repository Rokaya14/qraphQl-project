const _ = require("lodash");
const graphql = require("graphql");
let books = [
  { name: "Name of the wind", genre: "fantasy", id: "1" ,authorid:"1"},
  { name: "the final empire", genre: "since fiction", id: "2" ,authorid:"2"},
  { name: "the long earth", genre: "Sci-fi", id: "3" ,authorid:"3"},

];
let authors = [
  { name: "patrick rothfuss", age: "44", id: "1" },
  { name: "Brandon Sanderson", age: "42", id: "2" },
  { name: "Terry Pratcchett", age: "66", id: "3" },
];
const BookType = new graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    genre: { type: graphql.GraphQLString },

    author:{
      type:AuthorType,
      resolve(parent, args){
        return _.find(authors , {id:parent.authorid})
      }
    }
  }),
});
const AuthorType = new graphql.GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt },
  }),
});
const RootQuery = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: graphql.GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: graphql.GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});
let schema = new graphql.GraphQLSchema({ query: RootQuery });

module.exports = schema;
