
const _=require("lodash")
const graphql =require("graphql") ;
 let books = [
     {name: "Name of the wind", genre :"fantasy", id:"1"},
     {name: "Harry poter", genre :"since fiction", id:"2"},
     {name: "the long earth", genre :"Sci-fi",id:"3"}
 ]

const BookType = new graphql.GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:graphql.GraphQLString},
        genre:{type:graphql.GraphQLString}
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name :'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:graphql.GraphQLID}},
           resolve(parent,args){
            return _.find(books,{id: args.id})
           }
        }
    }
})
let schema = new graphql.GraphQLSchema({query: RootQuery})

module.exports = schema
