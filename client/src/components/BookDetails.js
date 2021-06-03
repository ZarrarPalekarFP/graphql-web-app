import React from "react";
import { graphql } from "react-apollo";
import { getBookDetailsQuery } from "../graphqlQueries/BooksQueries";

const BookDetails = (props) => {
  const { bookId } = props;
  const { book, loading } = props.data;

  return (
    <div id="book-details">
      {loading ? (
        <h3>Loading Book Details...</h3>
      ) : book ? (
        <div>
          <h2>Name: {book.name}</h2> <p>Genre: {book.genre}</p>
          <p>Author: {book.author.name}</p>
          <p>All books by this author: </p>
          <ul className="other-books">
            {book.author.books &&
              book.author.books.map((book) => (
                <li key={book.id}>
                  Name: {book.name}, Genre: {book.genre}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>No Book Selected..!!</div>
      )}
    </div>
  );
};

export default graphql(getBookDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId, //this id is used in the bookDetails query
      },
    };
  },
})(BookDetails);
