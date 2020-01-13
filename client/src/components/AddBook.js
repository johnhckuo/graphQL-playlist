import React from 'react';
// @apollo/react-hooks help us bind apollo to react
import { useQuery } from '@apollo/react-hooks';
import { getAuthorsQuery } from "../queries/queries"

function AddBook() {

  const { loading, error, data } = useQuery(getAuthorsQuery);

  let authors = []
  if (loading){
     authors.push(<option disabled>Loading...</option>);
  }
  if (error){
     authors.push(<option disabled>Error :(</option>);
  }

  if (data){
    authors = data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        );
      });
  }

  return (
    <form id="add-book">

      <div className="field">
        <label>Book name:</label>
        <input type="text"/>
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text"/>
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select an author</option>
          {authors}
        </select>
      </div>

      <button> + </button>

    </form>
  );

}

// it means bind the result of the graphql query into BookList component as props
export default AddBook;
