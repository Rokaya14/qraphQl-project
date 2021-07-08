import BookList from "./components/BookList";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

//Apollo cleint setup
const client = new ApolloClient({
  uri: "https://http://localhost:4000/graphql", //will make request to this endpoint "GraphQL server.".
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>react App</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
