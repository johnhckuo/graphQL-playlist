import React from 'react';
// @apollo/react-hooks help us bind apollo to react
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from "../queries/queries"

function BookList() {

  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(book => {
    return (
      <div>
        <ul id="book-list">
          <li key={ book.id }>{ book.name }</li>
        </ul>
      </div>
    );
  })

}

// it means bind the result of the graphql query into BookList component as props
export default BookList;
