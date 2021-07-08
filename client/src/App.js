import BookList from "./components/BookList";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AddBook from "./components/AddBook";

//Apollo cleint setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", //will make request to this endpoint "GraphQL server.".
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Reading List </h1>
        
          <BookList />
          <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
