import React, { useRef, useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import { getAuthorsQuery } from "../graphqlQueries/AuthorsQueries";
import { addBookMutation, getBooksQuery } from "../graphqlQueries/BooksQueries";

const AddBook = (props) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const nameInput = useRef();
  const genreInput = useRef();
  const authorIdInput = useRef();

  const { authors, loading } = props.getAuthorsQuery;
  //https://www.youtube.com/watch?v=ed8SzALpx1Q&t=11649s composingqueries section 31

  const submitForm = () => {
    props.addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }], //to refresh the book list after adding a book
    });
    //https://www.youtube.com/watch?v=ed8SzALpx1Q&t=11649s composingqueries section 31

    nameInput.current.value = "";
    genreInput.current.value = "";
    authorIdInput.current.value = "";
  };

  return (
    <form
      id="add-book"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <div className="field">
        <label>Book name:</label>
        <input
          ref={nameInput}
          required
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          ref={genreInput}
          required
          type="text"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Author:</label>

        <select
          ref={authorIdInput}
          required
          onChange={(e) => {
            setAuthorId(e.target.value);
          }}
        >
          <option value="">Select author</option>
          {loading ? (
            <option disabled>Loading...</option>
          ) : (
            authors &&
            authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))
          )}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
