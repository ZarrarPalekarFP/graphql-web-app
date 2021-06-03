import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import {
  getBooksQuery,
  deleteBookMutation,
} from "../graphqlQueries/BooksQueries";
import BookDetails from "./BookDetails";

const BookList = (props) => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const { books, loading } = props.getBooksQuery;

  return (
    <div>
      <ul id="book-list">
        {loading ? (
          <h1>Loading Books...!!!</h1>
        ) : (
          books &&
          books.map((book) => (
            <>
              <li
                key={book.id}
                onClick={(e) => {
                  setSelectedBookId(book.id);
                }}
              >
                {book.name}
              </li>
              <button
                type="submit"
                className="minus-button"
                onClick={(e) => {
                  e.preventDefault();
                  props.deleteBookMutation({
                    variables: {
                      id: book.id,
                    },
                    refetchQueries: [{ query: getBooksQuery }], //to refresh the book list after adding a book
                  });
                }}
              >
                -
              </button>
            </>
          ))
        )}
      </ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
};

export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(BookList);
