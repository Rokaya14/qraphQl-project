const schema = require("./schema/schema");
const express = require("express");
const { graphqlHTTP } = require("express-graphql"); // middle ware that allow express to understand graphql Api
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rokaya141:@grqphql123@cluster0.d7nrh.mongodb.net/graphqlDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("Running a GraphQL API server at localhost:4000/graphql");
    });
  })
  .catch((e) => {
    console.log(e);
  });
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
