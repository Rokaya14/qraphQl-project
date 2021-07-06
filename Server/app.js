const schema = require("./schema/schema")
const express = require("express");
const {graphqlHTTP} = require('express-graphql'); // middle ware that allow express to understand graphql Api
const app = express();
// connect to mongo db 
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://rokaya14:@zz7895123@rokaya.9egfw.mongodb.net/graphQl?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  console.log("connected to d b");
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))
app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql"); 
});
