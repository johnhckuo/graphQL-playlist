import React from 'react';
import ApolloClient from "apollo-boost";
// @apollo/react-hooks help us bind apollo to react
import { ApolloProvider } from '@apollo/react-hooks';

// components
import BookList from './components/BookList';

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
