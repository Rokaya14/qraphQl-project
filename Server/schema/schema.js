
const _=require("lodash")
const {GraphQLObjectType , GraphQLString , GraphQLSchema} =require("graphql") ;
 let books = [
     {name: "Name of the wind", gener :"fantasy", id:"1"},
     {name: "Harry poter", gener :"since fiction", id:"2"},
     {name: "the long earth", gener :"Sci-fi",id:"3"}
 ]

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name :'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
           resolve(parent,args){
            _.find(books,{id: args.id})
           }
        }
    }
})
let schema = new GraphQLSchema({query: RootQuery})

module.export = schema
