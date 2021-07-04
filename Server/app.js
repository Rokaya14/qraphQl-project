const schema = require("./schema/schema")
const express = require("express");
const {graphqlHTTP} = require('express-graphql'); // middle ware that allow express to understand graphql Api
const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))
app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql"); 
});
