import React, {Component} from 'react';
import { gql } from 'apollo-boost';
// @apollo/react-hooks help us bind apollo to react
import { useQuery } from '@apollo/react-hooks';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

function BookList() {

  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data)
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </div>
  );

}

// it means bind the result of the graphql query into BookList component as props
export default BookList;
