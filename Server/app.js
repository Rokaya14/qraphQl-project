const express = require("express");
const {graphqlHTTP} = require('express-graphql'); // middle ware that allow express to understand graphql Api
const app = express();
app.use('/graphql', graphqlHTTP({
    
}))
app.listen(4000, () => {
  console.log("server on port 4000"); 
});
